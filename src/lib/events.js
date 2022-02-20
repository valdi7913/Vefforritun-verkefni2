import { query } from './db.js';

export async function listEvents(){
  const q = `SELECT * FROM events`;
  try {
    const result = await query(q);
    return result.rows;
  } catch (e) {
    console.error('unable to query', e);
  }
  return null;
}

export async function getEvent(id) {
  const q = `SELECT * FROM events WHERE id = ${id}`;
  try {
    const result = await query(q);
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (e) {
    console.error('unable to query', e);
  }
   return null;
}

export async function getAttendees(id) {
  const q = `SELECT * FROM signatures WHERE event = ${id}`;

  try {
    const result = await query(q);
    return result.rows;
  } catch (e) {
    console.error('unable to query', e);
  }
}

export async function addToEvent(name, eventId, comment) {
  const success = true;
  const now = new Date();
  const q = `
  INSERT INTO
    signatures (name, comment, event, created)
  VALUES
    ($1, $2, $3, 'April 1, 2012')`;




  try {
    await (query(q, [name, comment, eventId]));
  } catch (e) {
    console.error('unable to query', e);
    success = false;
  }
  return success;
}
