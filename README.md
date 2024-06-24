# TURBOTENANT TAKE HOME

## BUG IDENTIFICATION
| Code | Level    | Definition  |
| -----|:--------:|:------------|
| P1   | Critical | System inoperable or data loss |
| P2   | High     | Affecting major functionality without system crashing |
| P3   | Medium   | Moderate impact, minor feature issues UI/UX issues |
| P4   | Minor    | minor bugs limited user impact (cosmetic flaws, typos) |
| P5   | Trivial  | negligible impact (UI inconsistencies) |

1. Login
- (P3) When utilizing incorrect username/password there’s no visual error for user
- (P5) Login to register could have a greater visual difference other than just title (color change?)
2. Landing Page
- (P2) Refresh logs user out and takes to login page, need cookies for login
3. Adding property
- (P2) Able to add duplicate data
- (P3) Able to add property without title or description
- (P3) Failure to add property error could be more descriptive
-- ie. long title not allowed, what is max length?  max length of description?
4. Lead Page
- (P2) email not validated before being added
- (P2) Able to add duplicate data
- (P2) able to add lead with no values
- (P3) Title and Description if extra long is not centered (Full Lorem Ipsum...est laborum.)
- (P3) Failure to add lead error could be more descriptive

## TEST PLAN AND AUTOMATION
Add New Property
- Add Property with valid data
- Add Property and Cancel Add
- Add with duplicate data (pending functionality clarification)
- Add with variation of long text (pending limit clarification)
- Add with variation of empty values (pending "bug" clarification)

## DATA FLOW DIAGRAM
- Also attached in email
- [Link to Lucid Chart](https://lucid.app/lucidchart/f326eda0-17fb-475b-9221-af75d3081c60/edit?viewport_loc=-1602%2C202%2C4010%2C2349%2C0_0&invitationId=inv_2c91cee9-f450-4816-a4fb-872f9d03706c)


## SQL QUERY WRITING
Total Number of Leads
```
SELECT p.id AS property_id,
	p.title AS property_title,
	COUNT(l.id) AS total_leads
FROM users u
JOIN properties p ON u.id = p.user_id
LEFT JOIN leads ON p.id = l.property_id
WHERE u.username = 'test'
GROUP BY p.id, p.title
```

No Leads Per Property
```
SELECT p.id AS property_id,
	p.title AS property_title
FROM properties p
LEFT JOIN leads l ON p.id = l.property_id
WHERE l.id IS NULL;
```

Properties with >3 Leads
```
SELECT p.id, p.title, lead_count
FROM (
	SELECT l.property_id, COUNT(l.id) AS lead_count
	FROM leads l
	GROUP BY l.property_id HAVING COUNT(l.id) > 3
	) AS lead_counts
JOIN properties p ON lead_counts.property_id = p.id
JOIN users u ON p.user_id = u.id
WHERE u.username = 'landlord'
ORDER BY lead_counts.lead_count DESC;
```
