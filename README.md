# Salesforce Puppeteer Automation

# Conventions #
### Tests ###
1. Main <code>describe</code> block should be the name of the tested feature/component. ex. "License"
3. <code>test</code> block should be descriptive and start with: 'Should' word ex. 'Should publish message to AMQP'
4. Each test should be annotated with the initials of the author ex. test created by John Kowalski should be annotated with @JK

### Files ###
1. Use camel case
2. Suffix for file name should be the type of the file content:
    1. Pages: <code>xxxPage.js</code>
    2. Helpers: <code>xxxHelper.js</code>
    3. Wrappers: <code>xxxWrapper.js</code>
    4. Tests: <code>xxx.test.js</code>
    5. Component: <code>xxxComponent.js</code>
3. Files should be grouped together in meaningful directories

### Variables ###
1. Use **camelCase**
2. Variables should be meaningful
3. Do not use abbreviation in variable names

# Useful links #
### Puppeteer ###
[**Puppeteer**](https://pptr.dev/) Automation tool

### Jest ###
[**Jest**](https://jestjs.io/docs/puppeteer) Testing framework

### Naming conventions ###
[**Hungarian notation**](https://en.wikipedia.org/wiki/Hungarian_notation) Naming convention for variables
### Git ###
[**Learn git branching**](https://learngitbranching.js.org/?locale=pl) Cool tutorial where you can learn basics of git commands

### Xpaths ###
[**Xpath diner**](https://topswagcode.com/xpath/#) Learning xpath in form of a game

[**Xpath basics**](https://www.w3schools.com/xml/xpath_intro.asp) Among others, you can find here:
- xpath axes - cool feature, which allow to find nodes by their ancestors etc.

### README editing ###
[**Readme editing**](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links) Basic writing and formatting syntax