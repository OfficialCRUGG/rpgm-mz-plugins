import { PluginParameter, PluginStruct } from "rpgmts";

export function parameters(
  pluginName: string,
  paramDefs: PluginParameter[],
  structDefs?: PluginStruct[],
) {
  const params = PluginManager.parameters(pluginName);
  return parseParams(params, paramDefs, structDefs);
}

export function parseParams(
  params: Record<string, string>,
  paramDefs: PluginParameter[],
  structDefs?: PluginStruct[],
) {
  const parsedParams: Record<string, ParsedParamValue> = {};
  for (const key in params) {
    const paramDef = paramDefs.find((p) => p.name === key);
    if (!paramDef) continue;
    parsedParams[key] = parseParam(params[key], paramDef.type, structDefs);
  }
  return parsedParams;
}

export type ParsedParamValue =
  | number
  | number[]
  | boolean
  | boolean[]
  | string
  | string[]
  | undefined
  | undefined[]
  | object
  | object[];
export function parseParam(
  value: string,
  paramType: PluginParameter["type"],
  structDefs?: PluginStruct[],
) {
  const baseType = paramType.replace(/\[\]$/g, "").replace(/<.*>/g, "");
  const isArray = /\[\]$/.test(paramType);

  if (isArray) {
    if (typeof value === "string" && String(value).trim() === "")
      return undefined;
    return JSON.parse(value).map((v: string) =>
      parseParam(v, baseType as PluginParameter["type"], structDefs),
    );
  } else {
    switch (baseType) {
      case "actor":
      case "animation":
      case "armor":
      case "class":
      case "color":
      case "common_event":
      case "enemy":
      case "icon":
      case "item":
      case "map":
      case "skill":
      case "state":
      case "switch":
      case "tileset":
      case "troop":
      case "variable":
      case "weapon":
        if (typeof value === "string" && value.trim() === "") return undefined;
        return Number(Number(value).toFixed(0));
      case "number":
        if (typeof value === "string" && value.trim() === "") return undefined;
        return Number(value);
      case "boolean":
        if (typeof value === "string" && value.trim() === "") return undefined;
        return value === "true";
      case "location":
        if (typeof value === "string" && value.trim() === "") return undefined;
        const parsed = JSON.parse(value);
        return {
          mapId: parsed.mapId !== undefined ? Number(parsed.mapId) : undefined,
          x: parsed.x !== undefined ? Number(parsed.x) : undefined,
          y: parsed.y !== undefined ? Number(parsed.y) : undefined,
        };
      case "combo":
      case "file":
      case "select":
        if (typeof value === "string" && value.trim() === "") return undefined;
        return value;
      case "struct":
        console.log("struct a");
        if (typeof value === "string" && value.trim() === "") return undefined;
        console.log("struct b");
        if (!structDefs) return JSON.parse(value);
        console.log("struct c", baseType);
        const structName = paramType.match(/<(.+)>/)?.[1];
        const structDef = structDefs.find((s) => s.name === structName);
        console.log("struct d", structDef);
        if (!structDef) return JSON.parse(value);
        console.log("struct e");
        const structValue = JSON.parse(value);
        console.log("struct f", structValue);
        const parsedStruct: Record<string, any> = {};
        console.log("struct g");
        for (const field of structDef.params) {
          if (structValue[field.name] !== undefined) {
            parsedStruct[field.name] = parseParam(
              structValue[field.name],
              field.type,
              structDefs,
            );
          }
        }
        return parsedStruct;
      case "note":
        if (typeof value === "string" && value.trim() === "") return undefined;
        return JSON.parse(value);
      case "multiline_string":
      case "string":
      default:
        return value;
    }
  }
}
