import knex from '../../../config/database'

async function findCidToProcess(): Promise<any> {
  const [hasCidToProcess] = await knex
    .select('*')
    .from('GHAS_CID_T')
    .where({ IE_INTEGRADO: 'A' })
    .orderBy('ID_INTEGRACAO')
    .limit(1)

  return hasCidToProcess
}

export { findCidToProcess }
