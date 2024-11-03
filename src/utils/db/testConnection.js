import dbPool from '../../db/database.js';

export const testConnection = async (pool) => {
  try {
    const [rows] = await dbPool.query(`SELECT 1+1 AS solution`);
    console.log(`테스트 쿼리 결과: ${rows[0].solution}`);
  } catch (e) {
    console.error(`테스트 쿼리 실행 오류`, e);
  }
};
