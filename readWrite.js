fs = require("fs")

function writeDataFloat(path, data){
	let float_arr = new Float32Array(data)

	fs.open(path, 'a', (err, fd) => {
		if(err){
			console.log(`code: ${err.code}\nmessage: ${err.message}`)
		}else{


			let bytes_written = fs.writeSync(fd, float_arr, 0, float_arr.length*4, 0)
			console.log(`${bytes_written} bytes were written`)


			fs.close(fd, (err) =>{
				console.log("file closed")
			})
		}
	})
}

function readDataFloat(path){
	let binary = fs.readFileSync(path)
	let float_arr = new Float32Array(binary)
	console.log(float_arr.length)
}

writeDataFloat('testData', [23.20, 40.52, 1001.38])
readDataFloat('testData')