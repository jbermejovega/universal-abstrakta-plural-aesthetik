extends Node3D
class_name PalaEstacaGraphEngine

signal manifest_loaded(scene_id: String, digest: String)
signal obstruction_raised(code: String, detail: String)

const EXPECTED_SCHEMA := "uapa.pala-estaca.godot-manifest.v1"
const GENERATED_GROUP := "pala_estaca_generated"

@export_file("*.json") var manifest_path := "res://pala_estaca_scene.json"
@export var auto_load := true
@export_range(0.01, 2.0, 0.01) var vertex_radius := 0.12
@export_range(0.005, 0.5, 0.005) var relation_radius := 0.025
@export_range(0.1, 10.0, 0.1) var spatial_scale := 1.0
@export var show_overlay_labels := true

var _nodes_by_id: Dictionary = {}
var _generated_root: Node3D

func _ready() -> void:
	if auto_load:
		load_manifest(manifest_path)

func load_manifest(path: String) -> bool:
	clear_projection()
	if not FileAccess.file_exists(path):
		_raise_obstruction("MANIFEST_NOT_FOUND", path)
		return false

	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		_raise_obstruction("MANIFEST_OPEN_FAILED", path)
		return false

	var parsed: Variant = JSON.parse_string(file.get_as_text())
	if typeof(parsed) != TYPE_DICTIONARY:
		_raise_obstruction("MANIFEST_NOT_OBJECT", path)
		return false

	var manifest: Dictionary = parsed
	var validation := _validate_manifest(manifest)
	if not validation.is_empty():
		for issue in validation:
			_raise_obstruction("MANIFEST_INVALID", issue)
		return false

	_generated_root = Node3D.new()
	_generated_root.name = "PalaEstacaProjection"
	_generated_root.add_to_group(GENERATED_GROUP)
	add_child(_generated_root)

	for cell in manifest["cells"]:
		_create_cell(cell)
	for relation in manifest["relations"]:
		_create_relation(relation)
	if show_overlay_labels:
		for overlay in manifest["overlays"]:
			_create_overlay_label(overlay)

	manifest_loaded.emit(str(manifest["sceneId"]), str(manifest["digest"]))
	return true

func clear_projection() -> void:
	_nodes_by_id.clear()
	for child in get_children():
		if child.is_in_group(GENERATED_GROUP):
			remove_child(child)
			child.queue_free()
	_generated_root = null

func _validate_manifest(manifest: Dictionary) -> PackedStringArray:
	var issues := PackedStringArray()
	if manifest.get("schema", "") != EXPECTED_SCHEMA:
		issues.append("unexpected schema")
	if int(manifest.get("schemaVersion", 0)) != 1:
		issues.append("unsupported schemaVersion")
	for field in ["sceneId", "sourceDigest", "topology", "cells", "relations", "overlays", "hyperkernels", "invariants", "digest"]:
		if not manifest.has(field):
			issues.append("missing field: %s" % field)
	if manifest.has("invariants") and typeof(manifest["invariants"]) == TYPE_DICTIONARY:
		var invariants: Dictionary = manifest["invariants"]
		if invariants.get("noIdentityTransport", false) != true:
			issues.append("identity transport is forbidden")
		if invariants.get("renderIsProjection", false) != true:
			issues.append("render must remain a projection")
		if invariants.get("canonicalAuthority", true) != false:
			issues.append("Godot projection cannot be canonical authority")
	return issues

func _create_cell(cell: Dictionary) -> void:
	var mesh_instance := MeshInstance3D.new()
	mesh_instance.name = _safe_node_name(str(cell["id"]))
	mesh_instance.position = _vector3(cell.get("position", [0.0, 0.0, 0.0])) * spatial_scale
	mesh_instance.mesh = _mesh_for_kind(str(cell.get("kind", "VERTEX_CELL")), int(cell.get("dimension", 0)))
	mesh_instance.material_override = _material_for_kind(str(cell.get("kind", "VERTEX_CELL")))
	mesh_instance.set_meta("pala_estaca_id", str(cell["id"]))
	mesh_instance.set_meta("plural_type", str(cell.get("pluralType", "")))
	mesh_instance.set_meta("semantic_type", str(cell.get("semanticType", "")))
	mesh_instance.set_meta("semiotic_type", str(cell.get("semioticType", "")))
	mesh_instance.set_meta("context_id", str(cell.get("contextId", "")))
	_generated_root.add_child(mesh_instance)
	_nodes_by_id[str(cell["id"])] = mesh_instance

func _create_relation(relation: Dictionary) -> void:
	var source_id := str(relation.get("source", ""))
	var target_id := str(relation.get("target", ""))
	if not _nodes_by_id.has(source_id) or not _nodes_by_id.has(target_id):
		_raise_obstruction("DANGLING_RELATION", "%s -> %s" % [source_id, target_id])
		return

	var source: Node3D = _nodes_by_id[source_id]
	var target: Node3D = _nodes_by_id[target_id]
	var delta := target.position - source.position
	var length := delta.length()
	if length <= 0.000001:
		_raise_obstruction("DEGENERATE_RELATION", "%s -> %s" % [source_id, target_id])
		return

	var cylinder := CylinderMesh.new()
	cylinder.top_radius = relation_radius
	cylinder.bottom_radius = relation_radius
	cylinder.height = length

	var visual := MeshInstance3D.new()
	visual.name = _safe_node_name("relation_%s_%s" % [source_id, target_id])
	visual.mesh = cylinder
	visual.position = (source.position + target.position) * 0.5
	visual.quaternion = Quaternion(Vector3.UP, delta.normalized())
	visual.material_override = _relation_material(str(relation.get("kind", "INCIDENCE")))
	visual.set_meta("source", source_id)
	visual.set_meta("target", target_id)
	visual.set_meta("relation_kind", str(relation.get("kind", "INCIDENCE")))
	_generated_root.add_child(visual)

func _create_overlay_label(overlay: Dictionary) -> void:
	var support: Array = overlay.get("support", [])
	if support.is_empty() or not _nodes_by_id.has(str(support[0])):
		return
	var anchor: Node3D = _nodes_by_id[str(support[0])]
	var label := Label3D.new()
	label.name = _safe_node_name("overlay_%s" % str(overlay.get("id", "unknown")))
	label.text = "%s  H^%s  %s" % [
		str(overlay.get("id", "overlay")),
		str(overlay.get("degree", 0)),
		str(overlay.get("family", "")),
	]
	label.position = anchor.position + Vector3(0.0, 0.25, 0.0)
	label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	label.font_size = 24
	_generated_root.add_child(label)

func _mesh_for_kind(kind: String, dimension: int) -> Mesh:
	if kind == "VERTEX_CELL":
		var sphere := SphereMesh.new()
		sphere.radius = vertex_radius
		sphere.height = vertex_radius * 2.0
		return sphere
	var box := BoxMesh.new()
	var scale_factor := max(1.0, float(dimension))
	box.size = Vector3(vertex_radius * 1.6, vertex_radius * 0.55, vertex_radius * 1.6) * scale_factor
	return box

func _material_for_kind(kind: String) -> StandardMaterial3D:
	var material := StandardMaterial3D.new()
	match kind:
		"VERTEX_CELL": material.albedo_color = Color(0.20, 0.55, 0.95, 1.0)
		"EDGE_CELL": material.albedo_color = Color(0.20, 0.80, 0.55, 1.0)
		"FACET_CELL": material.albedo_color = Color(0.95, 0.55, 0.22, 0.72)
		_: material.albedo_color = Color(0.60, 0.30, 0.92, 0.62)
	material.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	return material

func _relation_material(kind: String) -> StandardMaterial3D:
	var material := StandardMaterial3D.new()
	material.albedo_color = Color(0.85, 0.85, 0.90, 1.0) if kind == "INCIDENCE" else Color(0.95, 0.35, 0.35, 1.0)
	return material

func _vector3(value: Variant) -> Vector3:
	if typeof(value) != TYPE_ARRAY:
		return Vector3.ZERO
	var values: Array = value
	return Vector3(
		float(values[0]) if values.size() > 0 else 0.0,
		float(values[1]) if values.size() > 1 else 0.0,
		float(values[2]) if values.size() > 2 else 0.0,
	)

func _safe_node_name(value: String) -> String:
	return value.replace("/", "_").replace(":", "_").replace(" ", "_")

func _raise_obstruction(code: String, detail: String) -> void:
	push_warning("PalaEstaca obstruction [%s]: %s" % [code, detail])
	obstruction_raised.emit(code, detail)
