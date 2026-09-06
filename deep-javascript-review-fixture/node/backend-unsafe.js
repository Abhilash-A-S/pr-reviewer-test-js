import { exec } from "node:child_process";
import path from "node:path";

export async function findUser(database, email) {
  return database.query("SELECT * FROM users WHERE email = '" + email + "'");
}

export function pingHost(host) {
  exec("ping -c 1 " + host);
}

export function downloadPath(rootDirectory, requestedName) {
  return path.join(rootDirectory, requestedName);
}

export function deleteUser(request, response, repository) {
  if (request.headers["x-role"]) {
    repository.delete(request.params.userId);
    return response.status(204).end();
  }
  return response.status(401).end();
}

export function logLogin(logger, email, password) {
  logger.info("Login attempt", { email, password });
}

export function createResetCode() {
  return Math.random().toString(36).slice(2);
}
