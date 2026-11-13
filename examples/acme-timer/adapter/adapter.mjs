// Acme Timer - script Adapter. Runs in its own process after the user approved it.
const POLL_MS = 1000;

export default function createAdapter(api) {
  const http = api.connection("timer"); // the connection declared in adapter.json (URL already filled in)
  const stepSeconds = Number(api.settings.step_seconds) || 10;
  let state = { connected: false, text: "Not connected" };
  let timer = null;

  const format = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  async function refresh() {
    let next;
    try {
      const answer = await http.request({ method: "GET", path: "/timer" });
      next = { connected: true, remaining_s: answer.remaining_s, running: answer.running === true, text: format(answer.remaining_s) };
    } catch (error) {
      next = { connected: false, text: "Acme Timer is not running", connection_error: error.message };
    }
    if (JSON.stringify(next) !== JSON.stringify(state)) {
      state = next;
      api.changed("timer.state"); // RUN reads the States on this Source now
    }
  }

  return {
    async start() {
      await refresh();
      timer = setInterval(() => void refresh(), POLL_MS);
    },
    stop() {
      clearInterval(timer);
    },
    sources: {
      "timer.state": async () => state,
    },
    actions: {
      "timer.adjust": async (parameters) => {
        const steps = Number(parameters.delta); // parameters arrive as text
        if (!Number.isFinite(steps)) throw new Error("No change given.");
        const answer = await http.request({ method: "POST", path: "/timer/adjust", body: { seconds: steps * stepSeconds } });
        await refresh();
        return answer;
      },
    },
    status() {
      return { connected: state.connected };
    },
  };
}
