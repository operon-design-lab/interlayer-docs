// Press Counter: a sample script Adapter for the Built-in API - api.storage (the count survives the Adapter's idle stop
// and InterLayer restarting), api.builtin (the system output volume, under the declared permission system_volume.read),
// the Action Context (where the press came from) and one-shot Actions (feature kind "action"). No connection.
export default function createAdapter(api) {
  async function snapshot() {
    const count = (await api.storage.get("count")) ?? 0;
    const last = (await api.storage.get("last")) ?? null;
    return { count, text: `${count} press${count === 1 ? "" : "es"}`, last_part: last?.part_id ?? "", last_at: last?.at ?? "", last_volume: last?.volume ?? null };
  }

  return {
    sources: { "counter.state": snapshot },
    actions: {
      async "counter.press"(parameters, context) {
        const count = ((await api.storage.get("count")) ?? 0) + 1;
        let volume = null;
        try {
          volume = (await api.builtin.read("macos.output_volume")).volume ?? null;
        } catch (error) {
          api.log(`volume not read (${error.code}${error.permission ? `, needs ${error.permission}` : ""})`); // e.g. not approved yet
        }
        await api.storage.set("count", count);
        await api.storage.set("last", { at: context?.at ?? null, part_id: context?.origin?.part_id ?? null, volume });
        api.changed("counter.state");
        return { count };
      },
      async "counter.reset"() {
        await api.storage.clear();
        api.changed("counter.state");
        return { count: 0 };
      },
    },
  };
}
