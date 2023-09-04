import chalk from "chalk"
import { getAddress } from "viem"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

// now we need to process all images and make sure they are checksum valid AND the files are lowercased
// we will use viem for ethereum checksum

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const tokensDir = path.join(__dirname, "data/tokens")

console.log("Validating images")
console.log("")

fs.readdirSync(tokensDir).forEach((folder) => {
  console.log(`Processing folder: ${folder}`)
  const chainDir = path.join(tokensDir, folder)

  fs.readdirSync(chainDir).forEach((file) => {
    try {
      // Validate the file (assuming a function validateImage exists)
      const fileStats = path.parse(file)
      const filename = fileStats.name

      // this will throw if the file doesn't convert to a valid checksum
      const checksum = getAddress(filename)

      // is the file a png?
      if (fileStats.ext !== ".png") {
        throw new Error("File is not a png")
      }
      const lowercasedFilename = checksum.toLowerCase() + fileStats.ext

      let wasRenamed = false
      if (file !== lowercasedFilename) {
        // rename it to lower case
        console.log("chainDir", chainDir, lowercasedFilename)
        fs.renameSync(path.join(chainDir, file), path.join(chainDir, lowercasedFilename))
        wasRenamed = true
      }

      if (wasRenamed) {
        console.log(chalk.green("✔"), file, "was renamed and is valid")
      } else {
        console.log(chalk.green("✔"), file, "is valid")
      }

      // Rename the file to lowercase (assuming a function renameToLowercase exists)
      // renameToLowercase(path.join(chainDir, file))
    } catch (error) {
      console.log(chalk.red("✖️"), file, error.message)
      process.exit(1)
    }
  })
})
console.log("")
