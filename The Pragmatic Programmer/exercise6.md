# Backus Naur Form (BNF) for parsing time specification

| Rule | Grammar |
|------|---------|
|time|::= hour ampm \| hour : minute amppm \| hour : minute|
|ampm|::= am \| pm|
|hour|::= 2 h-tf-digit \| h-tens digit \| digit|
|minute|::= m-tens digit|
|h-tens|::= 0 \| 1|
|m-tens|::= 0 \| 1 \| 2 \| 3 \| 4 \| 5|
|digit|::= 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9|
|h-tf-digit|::= 0 \| 1 \| 2 \| 3|