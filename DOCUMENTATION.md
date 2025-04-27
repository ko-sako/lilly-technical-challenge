# Lilly Technical Challenge Documentation Template

*This documentation template serves as a place for you to discuss how you approached this challenge, any issues you faced & how you overcame them, or any other points that you feel would be relevant for the interviewers to know. The text in italics is here to guide you - feel free to remove it once you fill out each section!*

***Not every section in this document is required. This is just a template to help get you started. Feel free to add or remove sections as you feel necessary.***

## Approach
*How did you approach this challenge? Did you work through the objectives in any particular order? If so, why? Did you utilize any external resources, such as tutorials, guides, or other materials?*
### 
Throughout the project, I followed an agile approach. 
I broke down the overall task into smaller, executable units and continuously built a system by adding new features gradually.
Each task was tracked as a GitHub issue. I created a new branch from each issue to clearly link tasks to their branches, making progress easy to manage.

The project was proceeded with the following steps.

1. Understanding the project goal and breaking down the small tasks
2. Creating wireframes 
3. Creating GitHub issues representing each task
4. Developing features one by one from each issue
5. Testing/reviewing completed work and creating additional issues for any missing or incomplete points

After understanding the project goals, I created wireframes using Figma.
Having a visual reference helped clarify the target outcome and reduced confusion later on.

To create the wireframes, I searched similar existing web services and followed their design patterns.
This made the UI more familiar and intuitive for users (users can predict how to use the system), improving usability and user experience.
I also tried to reflect Lilly's brand colour and fonts as much as possible.

Each GitHub issue included the same basic structure to ensure consistency and avoid missing any mandatory information.
I kept the content simple but clear enough to avoid unnecessary effort, but still clear enough to understand what needed to be developed.
This made it easier for the developer (myself) to stay on track and avoid confusion.

I created issues not only for the main tasks but also for any bugs or additional features that came up during development.

I decided the development order with the intention of completing the Minimum Viable Product (MVP) as early as possible.
For instance, styling and less critical parts were done later, so the system remained functional/executable throughout the process.

## Objectives - Innovative Solutions
*For the challenge objectives, did you do anything in a particular way that you want to discuss? Is there anything you're particularly proud of that you want to highlight? Did you attempt some objectives multiple times, or go back and re-write particular sections of code? If so, why? Use this space to document any key points you'd like to tell us about.*
### Error Handling
#### API Request Error Handling
When making data requests to the FastAPI backend from the frontend, I wrapped the request in a try-catch block to ensure that, in the event of a server or network error, the issue would be caught and logged in the console.
This prevents unhandled failures from interrupting the user experience and provides useful debugging information during development.
```js
.catch(err => {
    averageCell.textContent = "Error fetching average price.";
    console.error('Error: ', err);
});
```

#### Data Exception Handling
When calculating the average price in the GET API I implemented, I added quality checks for the data being fetched.
Specifically:
- Products with an empty `name` are ignored from calculation.
- Product price with a non-numeric `price` (neither `int` or `float`) are ignored from calculation.

This prevents calculation errors due to incomplete or invalid data.
In addition, I used Python's list comprehension for efficient filtering and collection.
```python
valid_prices = [med["price"] for med in current_db["medicines"]
    # Check the price is numeric (int or float) AND the product name is not empty
    # list comprehension + if
    if isinstance(med.get("price"), (int, float)) and med.get("name")]
```

#### Validation Process of Product Data Submitting 
When submitting product data, I initially used HTML form attributes `required`, `type`, and `min` to prevent invalid data, such as negative prices or empty product names, from being submitted.
In addition to this, I considered that not all browsers fully support the latest HTML form validation features.
To ensure consistent validation across all browsers, I implemented JavaScript validation checks, making sure the validation process works reliably regardless of the browser.


### User-friendly Frontend Design
#### User-friendly Error Handling
I implemented error handling to display "Unknown" for missing or invalid data, with the text highlighted in red for better visibility.
This allows users to intuitively identify erroneous values.
```js
// Handling the missing or error value of the product name.
            if (typeof name === 'string' && name.trim() !== '') {
                nameTd.textContent = item.name;
            } else {
                nameTd.textContent = 'Unknown';
                nameTd.classList.add('error-value');
            }
```
```css
.error-value {
    color: #D32B1E;
}
```

#### Loading Indicator Implementation
To enhance user experience during average price calculating, I implemented a simple loading indicator, displaying messages "Calculating..." when waiting for the server response.
This gives users feedback, reducing confusion when operations are running in the background.
```js
document.getElementById("calc-average-btn").addEventListener("click", () => {
    const averageCell = document.getElementById("average-value");
    averageCell.textContent = "Calculating...";
```

### Code Readability/Maintainability
#### Modular Code Structure
I organised the code into smaller, more manageable modules, using functions and methods like `document.getElementById` to make the code more readable and easier to maintain.
This modular approach allows for easier debugging, testing, and future expansion of the project.

## Problems Faced
*Use this space to document and discuss any issues you faced while undertaking this challenge and how you solved them. We recommend doing this proactively as you experience and resolve the issues - make sure you don't forget! (Screenshots are helpful, though not required)*.
### Medicine List Header was Missing
The function that reloads the table to display the current product data does not care about the headers, causing them to disappear.
#### What was the route cause:
The `loadMedicinesList()` function was refreshing the entire table, which included the `thead` section.
#### What I did:
I added `id="product-table-body"` to the tbody and updated the function to refresh only the table body (`tbody`).
```html
<table class="product-table" id="product-table">
<thead>
<tr>
<th>NAME</th>
<th>PRICE</th>
</tr>
</thead>
<tbody id="product-table-body">
<!-- Add row using JavaScript -->
</tbody>
</table>
```
```js
const tbody = document.getElementById('product-table-body');
tbody.innerHTML = ''; // Clear previous list
```

## Evaluation
*How did you feel about the challenge overall? Did some parts go better than others? Did you run out of time? If you were to do this again, and were given more time, what would you do differently?*
### Project Approach
Overall, I really enjoyed working on this challenge.
By breaking down the tasks and working iteratively, I was able to build up the system smoothly.
Some parts, especially the error handling, were slightly time-consuming than expected, because I carefully considered different edge cases.
However, I believe that extra effort led to a more robust final system.

### Difference from Real-World Service Development:
This challenge, while focused on implementing a simple system with vanilla JavaScript and FastAPI, helped me better understand the key concepts essential for real-world product development.
Specifically, considerations such as an error handling, user-friendly design, and a clear division of responsibilities between the API and frontend were crucial.
These practices, often overlooked in smaller projects, should be fundamental for creating reliable and user-friendly systems in larger-scale applications.

### Areas for Improvement
- If I had more time, I would add basic responsive design support for mobile devices.
- I would also implement unit tests for key JavaScript functions. Especially for API requests and the product information register validation.
- I would also add confirmation dialogues before submitting data for better user experience.