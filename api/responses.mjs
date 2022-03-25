
/**
 * Sends the inserted row's id (if available) back to the client
 */
export function insertResponse(res) {
  return (error, rows, fields) => {
    if (error) {
      throw error;
    }
    res.status(201).json({ id: rows.insertId ?? null, fields });
  }
}


export function selectResponse(res) {
  return (error, rows, fields) => {
    if (error) {
      throw error;
    }
    res.status(200).json({ rows, fields });
  }
}


export function updateResponse(res) {
  return (error, rows, fields) => {
    if (error) {
      throw error;
    }
    res.status(200).json({ fields });
  }
}


export function deleteResponse(res) {
  return (error) => {
    if (error) {
      throw error;
    }
    res.status(204).json();
  }
}



















export function updateResponse(error, res, rows) {
  if (error) {
    throw error;
  }
  res.status(200).json()
}