import {
  spawn,
  spawnSync,
} from 'child_process'

import {Maybe} from '@/interface/maybe'

interface CommandResult {
    stdout: string,
    stderr: string,
}

const defaultOption = ['-Q', 'utf8']
const p4CommandStr = 'p4'

function makeOption(cmd: string) {
  return defaultOption.concat(cmd.split(' '))
}

function p4cmd(cmd: string) {
  return new Promise((resolve, reject) => {
    const options = makeOption(cmd)

    const child = spawn(p4CommandStr, options)

    child.on('error', (err) => {
      reject(err)
    })

    const result: CommandResult = {
        stdout: '',
        stderr: '',
    }
    child.stdout.on('data', (data) => {
      result.stdout = data.toString()
    })

    child.stderr.on('data', (data) => {
      result.stderr = data.toString()
    })

    child.on('close', () => {
      resolve(result)
    })
  })
}

function p4cmdSync(cmd: string) {
  const options = makeOption(cmd)

  const syncResult = spawnSync(p4CommandStr, options)

  if (syncResult.error) {
    return null
  } else {
    return {
      stdout: syncResult.stdout.toString(),
      stderr: syncResult.stderr.toString(),
    }
  }
}

export function maybeP4CmdSync(cmd: string): Maybe<string> {
    const result = p4cmdSync(cmd)
    if (result && result.stdout) {
        return Maybe.Just(result.stdout)
    } else {
        return Maybe.Nothing()
    }
}

export {
  p4cmd,
  p4cmdSync,
}
