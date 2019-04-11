import {
  spawn,
  spawnSync,
} from 'child_process'

import * as interfaces from '@/interface'

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

    const result: interfaces.CommandResult = {
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

/* example
p4cmd('changes -u qiliuliu -m 5').then(function(result) {
  console.log(result)
}, function(err) {
  console.log(err)
})
*/

export {
  p4cmd,
  p4cmdSync,
}
