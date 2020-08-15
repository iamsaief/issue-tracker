document
	.getElementById("issueInputForm")
	.addEventListener("submit", submitIssue);

function submitIssue(e) {
	const getInputValue = (id) => document.getElementById(id).value;
	const description = getInputValue("issueDescription");
	const severity = getInputValue("issueSeverity");
	const assignedTo = getInputValue("issueAssignedTo");
	const id = Math.floor(Math.random() * 100000000) + "";
	const status = "Open";

	const issue = { id, description, severity, assignedTo, status };
	let issues = [];

	if (description !== "" && severity !== "" && assignedTo !== "") {
		if (localStorage.getItem("issues")) {
			issues = JSON.parse(localStorage.getItem("issues"));
		}
		issues.push(issue);
		localStorage.setItem("issues", JSON.stringify(issues));

		document.getElementById("issueInputForm").reset();
		fetchIssues();
	} else {
		alert("Fill in the filed properly");
	}

	e.preventDefault();
}

const closeIssue = (id) => {
	const issues = JSON.parse(localStorage.getItem("issues"));
	const currentIssue = issues.find((issue) => issue.id == id);
	currentIssue.status = "Closed";
	localStorage.setItem("issues", JSON.stringify(issues));
	fetchIssues();
};

const deleteIssue = (id) => {
	const issues = JSON.parse(localStorage.getItem("issues"));
	const remainingIssues = issues.filter((issue) => issue.id != id);
	console.log(remainingIssues);

	if (confirm("Do you want to delete it permanently?")) {
		localStorage.setItem("issues", JSON.stringify(remainingIssues));
		fetchIssues();
	}
};

const fetchIssues = () => {
	const issues = JSON.parse(localStorage.getItem("issues"));
	const issuesList = document.getElementById("issuesList");
	const issuseCount = document.getElementById("issuseCount");

	let closeIssue = 0;
	let openIssue = 0;
	let totalIssue = issues.length;

	issuesList.innerHTML = "";

	for (var i = 0; i < issues.length; i++) {
		const { id, description, severity, assignedTo, status } = issues[i];

		const red = `background-color:red`;
		const green = `background-color:green`;

		const cross = `text-decoration:line-through`;
		const normal = `text-decoration:none`;

		if (status === "Closed") {
			closeIssue++;
		} else {
			openIssue++;
		}

		issuesList.innerHTML += `
			<div class="col-md-4">
		    	<div class="well">
		      		<h6>Issue ID: ${id} </h6>
					<p><span class="label label-info" style=${
						status === "Closed" ? green : red
					}> ${status} </span></p>
					<h3 style=${status === "Closed" ? cross : normal}> ${description} </h3>
					<p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
					<p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
					<a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
					<a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
				</div>
			</div>
		`;
	}
	issuseCount.innerHTML = `
		<h3>Total Issues:</h3>
		<p>Open: ${openIssue}</p>
		<p>Close: ${closeIssue}</p>
		<p>Total: ${totalIssue}</p>
	`;
};
