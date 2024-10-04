const JIRA_API_URL = import.meta.env.VITE_JIRA_API_URL;
const JIRA_BASIC_AUTH = import.meta.env.VITE_JIRA_BASIC_AUTH;
const CORS_ANYWHERE_URL = import.meta.env.VITE_CORS_ANYWHERE_URL;

// Returns a list of all tasks(issues) in selected jira project (SBA-320H)
export async function getTasks(projectKey) {
    const url = `${CORS_ANYWHERE_URL}/${JIRA_API_URL}/search?jql=project=${projectKey}&maxResults=1000`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${JIRA_BASIC_AUTH}`,
        "Content-Type": "application/json",
        Origin: window.location.origin,
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const data = await response.json();
    return data;
  }
