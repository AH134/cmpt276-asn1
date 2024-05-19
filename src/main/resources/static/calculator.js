let activityCounter = 1;

const calculatePercentage = (inputEl) => {
    const parentNode = inputEl.parentNode;
    const activityId = parentNode.dataset.id;
    const grade = (document.getElementById(`grade-input-${activityId}`)).value;
    const maxGrade = (document.getElementById(`max-grade-input-${activityId}`)).value
    const percentage = (grade / maxGrade) * 100;
    const percentageElement = document.getElementById(`percentage-${activityId}`)

    if (isNaN(percentage) || percentage === Infinity || percentage === Number.NEGATIVE_INFINITY) {
        percentageElement.innerHTML = "Invalid Grades. Cannot calculate percentage.";
    } else {
        percentageElement.innerHTML = `${percentage.toFixed(0)}%`;
    }
}

const addRowBtn = document.getElementById("add-row-btn");
addRowBtn.addEventListener("click", () => {
    activityCounter += 1;
    const parentNode = document.getElementById("activity-container");

    const trElement = document.createElement("tr")
    trElement.id = `activity-${activityCounter}`;

    const titleTd = document.createElement("td");
    titleTd.innerText = `Activity ${activityCounter}`

    const nameTd = document.createElement("td");
    nameTd.innerText = `A${activityCounter}`

    const weightTd = document.createElement("td");
    const weightInput = document.createElement("input");

    weightInput.type = "number";
    weightInput.min = "0";
    weightInput.id = `weight-input-${activityCounter}`;
    weightInput.className = "input";

    weightTd.appendChild(weightInput);

    const gradeTd = document.createElement("td");
    const gradeDiv = document.createElement("div");
    const gradeInput = document.createElement("input");
    const gradeSeperator = document.createElement("p");
    const maxGradeInput = document.createElement("input");

    gradeDiv.className = "grade-container"
    gradeDiv.dataset.id = activityCounter;

    gradeInput.type = "number";
    gradeInput.min = "0";
    gradeInput.id = `grade-input-${activityCounter}`;
    gradeInput.setAttribute("oninput", "calculatePercentage(this)");
    gradeInput.className = "input";

    gradeSeperator.innerText = "/";
    gradeSeperator.className = "grade-input-seperator";

    maxGradeInput.type = "number";
    maxGradeInput.min = "0";
    maxGradeInput.id = `max-grade-input-${activityCounter}`;
    maxGradeInput.setAttribute("oninput", "calculatePercentage(this)");
    maxGradeInput.className = "input";

    gradeDiv.appendChild(gradeInput);
    gradeDiv.appendChild(gradeSeperator);
    gradeDiv.appendChild(maxGradeInput);

    gradeTd.appendChild(gradeDiv);

    const percentTd = document.createElement("td");
    percentTd.id = `percentage-${activityCounter}`;

    trElement.appendChild(titleTd);
    trElement.appendChild(nameTd);
    trElement.appendChild(weightTd);
    trElement.appendChild(gradeTd);
    trElement.appendChild(percentTd);

    parentNode.appendChild(trElement);
})

const meanBtn = document.getElementById("calculate-mean-btn");
meanBtn.addEventListener("click", () => {
    const resultElement = document.getElementById("calculated-result");
    let sum = 0;
    for (let i = 1; i <= activityCounter; i++) {
        const grade = (document.getElementById(`grade-input-${i}`)).value;
        const maxGrade = (document.getElementById(`max-grade-input-${i}`)).value;

        sum += (grade / maxGrade);
    }
    sum = sum / activityCounter;

    if (isNaN(sum) || sum === Infinity || sum === Number.NEGATIVE_INFINITY) {
        resultElement.innerText = "Mean: Invalid grades";
    } else {
        resultElement.innerText = `Mean: ${sum}`;
    }
});

const weightBtn = document.getElementById("calculate-weight-btn");
weightBtn.addEventListener("click", () => {
    const resultElement = document.getElementById("calculated-result");
    let sum = 0;
    let weightSum = 0;
    for (let i = 1; i <= activityCounter; i++) {
        const grade = (document.getElementById(`grade-input-${i}`)).value;
        const maxGrade = (document.getElementById(`max-grade-input-${i}`)).value;
        const weight = (document.getElementById(`weight-input-${i}`)).value;
        
        sum += (grade / maxGrade) * weight;
        weightSum += Number(weight);
    }
    sum = sum / weightSum;

    if (isNaN(sum)) {
        resultElement.innerText = "Weight: Invalid grades and/or weights";
    } else {
        resultElement.innerText = `Weight: ${sum}`;
    }
});