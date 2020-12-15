import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import { time } from "d3";

function parseData(parse) {
	return function(d) {
		//d.date = parse(d.date);
		var parts = d.date.split(" ");
		var parts1 = parts[0].split("-");
		var parts2 = parts[1].split(":");
  		// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  		d.date =  new Date(parts1[0], parts1[1]-1, parts1[2], parts2[0], parts2[1], parts2[2]);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d %H:%M:%S");
const parseDate1 = timeParse("%Y-%m-%d");
const apikey = "525f52f4ab862d8f9dd17476d613de0a";
function parseMyData(data)
{
	data.forEach(element => {
		//element.date = new Date(parts[0], parts[1]-1, parts[2], 0, 0, 0);
		element.date = parseDate(element.date);
	});
	data.columns = ["open", "high", "low", "close", "volume"];
	return data.reverse();
}
function parseMyData1(data)
{
	data.forEach(element => {
		//element.date = new Date(parts[0], parts[1]-1, parts[2], 0, 0, 0);
		element.date = parseDate1(element.date);
	});
	data.columns = ["open", "high", "low", "close", "volume"];
	return data.reverse();
}
// export function getData() {
// 	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
// 		.then(response => response.text())
// 		.then(data => tsvParse(data, parseData(parseDate)))
// 	return promiseMSFT;
// }
export function getData(symbolname, intervalname) {
	if (intervalname == "1d")
	{
		const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-price-full/"+symbolname+"?apikey="+apikey)
		.then(response => response.json())
		.then(data => parseMyData1(data['historical']))
		return promiseMSFT;
	}
	else if(intervalname == "4h"){
		const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-chart/4hour/"+symbolname+"?apikey="+apikey)
		.then(response => response.json())
		.then(data => parseMyData(data))
		return promiseMSFT;
	}
	else if(intervalname == "1h"){
		const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-chart/1hour/"+symbolname+"?apikey="+apikey)
		.then(response => response.json())
		.then(data => parseMyData(data))
		return promiseMSFT;
	}
	else if(intervalname == "30m"){
		const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-chart/30min/"+symbolname+"?apikey="+apikey)
		.then(response => response.json())
		.then(data => parseMyData(data))
		return promiseMSFT;
	}
	else if(intervalname == "15m"){
		const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-chart/15min/"+symbolname+"?apikey="+apikey)
		.then(response => response.json())
		.then(data => parseMyData(data))
		return promiseMSFT;
	}
	else if(intervalname == "5m"){
		const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-chart/5min/"+symbolname+"?apikey="+apikey)
		.then(response => response.json())
		.then(data => parseMyData(data))
		return promiseMSFT;
	}
	else{
		const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-chart/1min/"+symbolname+"?apikey="+apikey)
		.then(response => response.json())
		.then(data => parseMyData(data))
		return promiseMSFT;
	}
}
