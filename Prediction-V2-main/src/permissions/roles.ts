export const ROLES = {
  ANONYMOUS: 'anonymous',
  READER: 'reader',
  PREDICTOR: 'predictor',
  AUDITOR: 'auditor',
  ADMIN: 'admin',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, number> = {
  anonymous: 0,
  reader: 1,
  predictor: 2,
  auditor: 3,
  admin: 99,
};

export function isRoleAtLeast(role: Role, minimum: Role): boolean {
  return (ROLE_HIERARCHY[role] ?? 0) >= (ROLE_HIERARCHY[minimum] ?? 0);
}
