# Project-Atelier: Products API
### **Developer:** Austin Miller
The Products endpoint for Project Atelier allows the front-end e-commerce store front to communicate with multiple servers, querying a MySQL database that houses millions of records with incredible retreival speed.

## Table of Contents
1. [**API Endpoints**](#api-endpoints)

2. [**Database and Schema Design**](#database-and-schema-design)

3. [**ETL**](#etl)

4. [**Initial Stress Testing**](#initial-stress-testing)

5. [**Docker and Deployment**](#docker-and-deployment)

6. [**Further Improvements**](#further-improvements)

## API Endpoints
* Four endpoints: products, products/:product_id, products/:product_id/styles, and products/:product_id/related needed to link front-end requests to a database housing millions of records coming from six csv files.
* The products endpoint retrieved all products for the store, and so there needed to be optional and default parameters to limit the number of views:
![products-params](mysql/readmeImages/products_params.png)
The final result would appear in this format:
![products](mysql/readmeImages/products.png)
* This API endpoint was fairly straightforward and would not need a lot of transformation after the initial query.
* The styles API endpoint was the most complex, relying on three separate database tables and multiple transformation algorithms to produce the desired format:
![styles](mysql/readmeImages/styles.png)

## Database and Schema Design
* I originally considered MongoDB as a non-relational database, as well as MySQL and PostgreSQL as a relational database.
* After initial consideration of the type of data I would be receiving, I leaned toward using a relational database, as the data would be very structured, and the format would likely not need to change due to business requirements down the road.
* After research into MySQL and PostgreSQL, I could see pros and cons with both databases, and ultimately went with MySQL.
* My schema design was built around the way the desired format of the data would be displayed. For example, in the styles endpoint, there is a nested array of objects for photos, and a nested object of objects for skus. I knew that I would need to link these to each style, and each style to the product id.
* I set up my schema so that each set of data could reference its parent when needed, ie a foreign key of product id for styles, and foreign key of style id for both photos and skus.

## ETL
* My stratgy for extraction, tranfer and loading of the data was straightforward from the start: I was able to extract and load the data into my database with a simple LOAD DATA INFILE command, with minor delimiters based on how the data was arranged in the csv files.
* From there, I used sql queries with joins, and javascript algorithms to transform the data into the desired format.
  * For example, the 'default?': true key-value pair in the styles endpoint was not originally named 'default?', and came with a binary 0 and 1 to represent true and false.
* The more difficult data transformation came with the styles endpoint.
  * I initially wanted to use one large query, but my query time became too long. This was because of the complex nature of the Common Table Expression that I used. CTEs are a subquery that can be recursive, or self-referencing multiple times in one query. This recursive nature was too demanding for my requests.
* I ended up using three separate queries for this endpoint, linked with Promises. This gave my data the desired format.

## Initial Stress Testing
* Upon initial stress testing on my local machine using Artillery.io, I tested 100 requests per second for a total of 2.5 minutes. This proved to work exceptionally well for three of my four endpoints. See below, the products endpoint with just 2 ms latency for the 99th percentile of requests:
![products-artillery](mysql/artilleryTests/reportImages/products_test1.png)
* However, due to the complicated nature of the styles endpoint, under the same conditions, the latency was just over 2000 ms for the 99th percentile of requests:
![styles-before-indexing](mysql/artilleryTests/reportImages/products_id_styles_test1.png)
* In order to solve this issue, I used indexing on the three tables referenced with the styles endpoint.
  * Indexing causes the database to create a data structure similar to a Binary Tree. This is naturally conducive to sorting, and allows the query to look for the specific row in the index. The index then refers to a pointer which will find the rest of the requested information.
  * After indexing, my styles endpoing dropped to a 10 ms latency for the 99th percentile of requests - a 99.5% improvement.
![styles-after-indexing](mysql/artilleryTests/reportImages/products_id_styles_test2_afterIndexing.png)

## Docker and Deployment
* I used AWS EC2 T2 micros to deploy my server and database separately. I used Docker within my EC2 to house my database and data.
* My goal was to get at least 100 requests per second with an average latency of less than 2000 ms.
* I initially tested my deployed server and database using Loader.io. I received generally good results for my endpoints:
  * With 1000 requests per second for 60 seconds, my products endpoint had an average latency of 52 ms.
  ![products-1server](mysql/loaderio/server1/products_1000.png)
  * However, my styles endpoint breached my 2000 ms goal somewhere around 250 requests per second for 60 seconds.
  ![styles-1server](mysql/loaderio/server1/styles_250.png)
* I added more servers incrementally under an AWS load balancer, using a Round-Robin assignment approach.
* I generally saw improvements with all of my endpoints from this. The most significant was with my products endpoint. Going from 1000 requests per second under one server to 3000 requests per second under three servers, I had an average latency of just 16 ms. While not completely apples to apples, this is just under a 70% improvement.
![products-3servers](mysql/loaderio/servers3/products_3000.png)
* My styles endpoint did improve, though very modestly, breaching a 2000 ms average latency at around 750 requests per second under three servers, versus 250 under one.
![styles-3servers](mysql/loaderio/servers3/styles_750.png)

## Further Improvements
* If I were to improve upon this project, I would start by looking into an async-await approach within my API endpoints, at least with my styles endpoint. This has potential to be a more efficient server endpoint than using Promises.
* I would also look into using a caching system for my database, possibly with Reddis. This would allow a much more efficient retrieval of data after the first request was made. I would try to allocate the top 20 products and related styles into this caching system so that most users would have a very efficient experience.