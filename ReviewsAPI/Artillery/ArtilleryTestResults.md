## Pre Optimizations

List of indices:
char_reviews_pkey FROM TABLE char_reviews
characteristics_pkey FROM TABLE characteristics
characteristics_product_id_idx FROM TABLE characteristics TYPE hash
photos_pkey FROM TABLE photos
reviews_pkey FROM TABLE reviews
reviews_product_id_idx FROM TABLE reviews TYPE hash

# Metadata endpoint

All virtual users finished
Duration: 20 Arrival Rate: 5
Summary report @ 11:02:52(-0400) 2021-06-30
Scenarios launched: 100
Scenarios completed: 100
Requests completed: 100
Mean response/sec: 4.81
Response time (msec):
min: 482
max: 1838
median: 617
p95: 1613.5
p99: 1782.5
Scenario counts:
0: 100 (100%)
Codes:
200: 100

All virtual users finished
Duration: 20 Arrival Rate: 20
Summary report @ 10:13:37(-0400) 2021-06-30
Scenarios launched: 400
Scenarios completed: 7
Requests completed: 7
Mean response/sec: 13.35
Response time (msec):
min: 3520
max: 7355
median: 6614
p95: 7355
p99: 7355
Scenario counts:
0: 400 (100%)
Codes:
200: 7
Errors:
ETIMEDOUT: 393

# Helpful endpoint

All virtual users finished
Duration: 20 Arrival Rate: 20
Summary report @ 10:37:10(-0400) 2021-06-30
Scenarios launched: 400
Scenarios completed: 400
Requests completed: 400
Mean response/sec: 19.56
Response time (msec):
min: 2
max: 122
median: 3
p95: 3
p99: 41.5
Scenario counts:
0: 400 (100%)
Codes:
201: 400

## More Indexing (\*new)

\*char_reviews_characteristic_id_idx FROM TABLE char_reviews TYPE hash
char_reviews_pkey FROM TABLE char_reviews
characteristics_pkey FROM TABLE characteristics
characteristics_product_id_idx FROM TABLE characteristics TYPE hash
photos_pkey FROM TABLE photos
reviews_pkey FROM TABLE reviews
reviews_product_id_idx FROM TABLE reviews TYPE hash

# Metadata endpoint

All virtual users finished
Duration: 20 Arrival Rate: 5
Summary report @ 11:22:19(-0400) 2021-06-30
Scenarios launched: 100
Scenarios completed: 100
Requests completed: 100
Mean response/sec: 4.93
Response time (msec):
min: 1
max: 184
median: 1
p95: 2
p99: 93
Scenario counts:
0: 100 (100%)
Codes:
200: 100

All virtual users finished - searching for product_id 622415
Duration: 20 Arrival Rate: 20
Summary report @ 11:26:49(-0400) 2021-06-30
Scenarios launched: 400
Scenarios completed: 400
Requests completed: 400
Mean response/sec: 19.56
Response time (msec):
min: 0
max: 79
median: 1
p95: 1
p99: 2
Scenario counts:
0: 400 (100%)
Codes:
200: 400

All virtual users finished - searching for product_id 563622
Duration: 30 Arrival Rate: 200
Summary report @ 11:51:57(-0400) 2021-06-30
Scenarios launched: 6000
Scenarios completed: 6000
Requests completed: 6000
Mean response/sec: 196.66
Response time (msec):
min: 0
max: 9
median: 1
p95: 1
p99: 2
Scenario counts:
0: 6000 (100%)
Codes:
200: 6000

All virtual users finished - searching for product_id 118346
Duration: 45 Arrival Rate: 300
Summary report @ 12:05:50(-0400) 2021-06-30
Scenarios launched: 13501
Scenarios completed: 13501
Requests completed: 13501
Mean response/sec: 296.53
Response time (msec):
min: 0
max: 56
median: 0
p95: 1
p99: 1
Scenario counts:
0: 13501 (100%)
Codes:
200: 13501

All virtual users finished - searching for product_id 945823
Duration: 45 Arrival Rate: 800
Summary report @ 12:08:09(-0400) 2021-06-30
Scenarios launched: 36000
Scenarios completed: 36000
Requests completed: 36000
Mean response/sec: 789.82
Response time (msec):
min: 0
max: 68
median: 1
p95: 1
p99: 2
Scenario counts:
0: 36000 (100%)
Codes:
200: 36000

All virtual users finished - searching for product_id 624512
Duration: 60 Arrival Rate: 2000
Summary report @ 12:10:29(-0400) 2021-06-30
Scenarios launched: 120000
Scenarios completed: 120000
Requests completed: 120000
Mean response/sec: 1973.04
Response time (msec):
min: 0
max: 100
median: 1
p95: 2
p99: 6
Scenario counts:
0: 120000 (100%)
Codes:
200: 120000

# Helpful endpoint

All virtual users finished - searching for product_id 612423
Duration: 60 Arrival Rate: 100
Summary report @ 12:24:04(-0400) 2021-06-30
Scenarios launched: 6000
Scenarios completed: 6000
Requests completed: 6000
Mean response/sec: 99.16
Response time (msec):
min: 1
max: 321
median: 2
p95: 3
p99: 47
Scenario counts:
0: 6000 (100%)
Codes:
201: 6000

All virtual users finished - searching for product_id 31423
Duration: 60 Arrival Rate: 1000
Summary report @ 12:29:14(-0400) 2021-06-30
Scenarios launched: 60000
Scenarios completed: 15423
Requests completed: 15423
Mean response/sec: 850.58
Response time (msec):
min: 31
max: 10000
median: 5085
p95: 9527
p99: 9911
Scenario counts:
0: 60000 (100%)
Codes:
201: 15423
Errors:
ETIMEDOUT: 44577

## More Indexing (\*new)

char_reviews_characteristic_id_idx FROM TABLE char_reviews TYPE hash
char_reviews_pkey FROM TABLE char_reviews
characteristics_pkey FROM TABLE characteristics
characteristics_product_id_idx FROM TABLE characteristics TYPE hash
photos_pkey FROM TABLE photos
reviews_pkey FROM TABLE reviews
reviews_product_id_idx FROM TABLE reviews TYPE hash
\*reviews_review_id_idx FROM TABLE reviews TYPE hash

# Helpful endpoint

All virtual users finished - searching for product_id 314023
Duration: 60 Arrival Rate: 1000
Summary report @ 12:40:37(-0400) 2021-06-30
Scenarios launched: 60000
Scenarios completed: 15317
Requests completed: 15317
Mean response/sec: 856.78
Response time (msec):
min: 30
max: 9999
median: 5014
p95: 9536
p99: 9914.3
Scenario counts:
0: 60000 (100%)
Codes:
201: 15317
Errors:
ETIMEDOUT: 44683
