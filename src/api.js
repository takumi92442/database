async function request(path, options = null) {
  const url = `${import.meta.env.VITE_API_ENDPOINT}${path}`;
  const response = await fetch(url, options);
  return response.json();
}

export function getLogin() {
  return request("/login");
}

export function postLogin(login) {
  return request("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  });
}

export function getTask(LoginID) {
  return request(`/task_list/${LoginID}`);
}


export function postTask(task) {
  console.log(task);
  return request("/task_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

export function delete_task(id) {
  return request(`/task_list/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
  

