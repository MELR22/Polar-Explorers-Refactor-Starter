/**
 * Storage boundary for tour progress.
 * Replace this in-memory example with LocalStorage or an API-backed store later.
 */
export function createMemoryProgressStore() {
  const progressBySession = new Map();
  return {
    async load(sessionId) {
      return progressBySession.get(sessionId) ?? null;
    },
    async save(sessionId, progress) {
      progressBySession.set(sessionId, structuredClone(progress));
    }
  };
}
