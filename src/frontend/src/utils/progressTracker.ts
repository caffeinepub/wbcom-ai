export interface StudyRecord {
  subject: string;
  chapter: string;
  studiedAt: number;
}

const KEY = "vs_study_history";

export function markTopicStudied(subject: string, chapter: string) {
  try {
    const existing = getStudyHistory();
    const key = `${subject}::${chapter}`;
    const filtered = existing.filter(
      (r) => `${r.subject}::${r.chapter}` !== key,
    );
    filtered.push({ subject, chapter, studiedAt: Date.now() });
    // keep last 500 records
    const toSave = filtered.slice(-500);
    localStorage.setItem(KEY, JSON.stringify(toSave));
  } catch {
    // ignore storage errors
  }
}

export function getStudyHistory(): StudyRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StudyRecord[];
  } catch {
    return [];
  }
}

export function getRevisionDueTopics(thresholdDays = 3): StudyRecord[] {
  const history = getStudyHistory();
  const cutoff = Date.now() - thresholdDays * 24 * 60 * 60 * 1000;
  return history.filter((r) => r.studiedAt < cutoff);
}
