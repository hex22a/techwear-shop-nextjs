import { PasskeySerialized, User, UserCredentials, UserWithPasskeyRow } from '@/app/lib/definitions';
import { db } from '@/app/lib/model/db';
import { formatPgArray } from '@/app/lib/model/helpers';

export async function findUser(username: string): Promise<User> {
  const queryResult = await db.query<User>`SELECT * FROM public.user WHERE username = ${username}`;
  return queryResult.rows[0] || null;
}

export async function getAllowCredentials(username: string): Promise<UserCredentials> {
  try {
    const queryResult = await db.query<UserWithPasskeyRow>`
                    SELECT
                        id,
                        username,
                        public.user.created_at as created_at,
                        passkey.cred_id as cred_id,
                        passkey.cred_public_key as cred_public_key,
                        passkey.webauthn_user_id as webauthn_user_id,
                        passkey.backup_eligible as backup_eligible,
                        passkey.backup_status as backup_status,
                        passkey.created_at as passkey_created_at,
                        passkey.transports as transports,
                        passkey.counter as counter,
                        passkey.internal_user_id as internal_user_id,
                        passkey.last_used as last_used
                    FROM
                        public.user
                    LEFT JOIN passkey ON public.user.id = passkey.internal_user_id
                    WHERE public.user.username = ${username}`;
    const user: UserCredentials = {
      passkeys: new Map(),
    };
    queryResult.rows.forEach((row) => {
      user.passkeys.set(row.cred_id, {
        id: row.cred_id,
        transports: row.transports,
      });
    });
    return user;
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to fetch user: ${username}`);
  }
}

export async function createUser(username: string, passkey: PasskeySerialized): Promise<User> {
  const { cred_id, counter, cred_public_key, backup_eligible, backup_status, webauthn_user_id, transports } = passkey;
  const formattedTransports = formatPgArray(transports);

  try {
    const queryResult = await db.query<User>`
            WITH new_user AS (
                INSERT INTO public.user (username) VALUES (${username}) RETURNING id, username, created_at
            ),
            new_passkey AS (
                INSERT INTO passkey (
                  internal_user_id,
                  cred_id,
                  counter,
                  cred_public_key,
                  backup_eligible,
                  backup_status,
                  webauthn_user_id,
                  transports
              )
              VALUES (
                  (SELECT id FROM new_user),
                  ${cred_id},
                  ${counter},
                  ${cred_public_key},
                  ${backup_eligible},
                  ${backup_status},
                  ${webauthn_user_id},
                  ${formattedTransports}::text[]
              )
              RETURNING 1
            )
            SELECT id, username, created_at FROM new_user;
    `;
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to create user: ${username}`);
  }
}

export async function getPasskeyWithUserId(cred_id: string, internal_user_id: string): Promise<PasskeySerialized> {
  try {
    const queryResult =
      await db.query<PasskeySerialized>`SELECT * FROM passkey WHERE cred_id = ${cred_id} AND internal_user_id = ${internal_user_id}`;
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to fetch passkey: ${cred_id}`);
  }
}
