import { cpus } from 'os'

export const getVersion = () => {
  return {
    nodeVersion: process.version,
    cpus: getCPUs(),
    platform: process.platform,
    arch: process.arch,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
  }
}

const getCPUs =() => {
  return {
    cpus: cpus.length
  }
}

export const PORT = 3001
