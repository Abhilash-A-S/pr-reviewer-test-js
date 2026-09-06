import { execFile } from "node:child_process";
import path from "node:path";
import { randomBytes } from "node:crypto";

export async function findUser(database, email) {
  return database.query("SELECT * FROM users WHERE email = ?", [email]);
}

export function pingHost(host) {
  if (!/^[a-z0-9.-]+$/i.test(host)) {
    throw new Error("Invalid host");
  }
  execFile("ping", ["-c", "1", host]);
}

export function downloadPath(rootDirectory, requestedName) {
  const root = path.resolve(rootDirectory);
  const candidate = path.resolve(root, requestedName);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
    throw new Error("Requested file is outside the download directory");
  }
  return candidate;
}

export async function deleteUser(request, response, repository) {
  if (!request.user?.roles?.includes("admin")) {
    return response.status(403).end();
  }
  await repository.delete(request.params.userId);
  return response.status(204).end();
}

export function logLogin(logger, email) {
  logger.info("Login attempt", { email });
}

export function createResetCode() {
  return randomBytes(32).toString("base64url");
}
