# 멤버십 프로젝트 - 웹할일관리 저장소

### Database
![ERD](https://kr.object.ncloudstorage.com/sjh-image-resource/todo_erd.png)

#### tbl_user
| Field      | Type          | Options              |
|------------|---------------|----------------------|
| user\_id   | varchar\(20\) | PRIMARY KEY NOT NULL |
| user\_pass | varchar\(20\) | NOT NULL             |
| user\_name | varchar\(20\) | NOT NULL             |
| admin      | boolean       | DEFAULT FALSE        |

#### tbl_project
| Field         | Type          | Options                                       |
|---------------|---------------|-----------------------------------------------|
| project\_id   | int           | PRIMARY KEY NOT NULL AUTO\_INCREMENT          |
| project\_name | varchar\(40\) | NOT NULL                                      |
| project\_idx  | int           | NOT NULL                                      |
| created\_by   | varchar\(20\) | FOREIGN KEY REFERENCES tbl\_user \(user\_id\) |

#### tbl_column
| Field        | Type          | Options                                  |
|--------------|---------------|------------------------------------------|
| column\_id   | int           | PRIMARY KEY NOT NULL AUTO\_INCREMENT     |
| column\_name | varchar\(40\) | NOT NULL                                 |
| column\_idx  | int           | NOT NULL                                 |
| project\_id  | int           | FOREIGN KEY REFERENCES tbl_project \(project\_id\) |
| created\_by  | varchar\(20\) | FOREIGN KEY REFERENCES tbl_user \(user\_id\) |

#### tbl_card
| Field          | Type           | Options                                     |
|----------------|----------------|---------------------------------------------|
| card\_id       | int            | PRIMARY KEY NOT NULL AUTO\_INCREMENT        |
| card\_title    | varchar\(100\) | NOT NULL                                    |
| card\_contents | TEXT           | NOT NULL                                    |
| card\_idx      | int            | NOT NULL                                    |
| column\_id     | int            | FOREIGN KEY REFERENCES tbl_column \(column\_id\) |
| created\_by    | varchar\(20\)  | FOREIGN KEY REFERENCES tbl_user \(user\_id\)|

#### tbl_card_files
| Field            | Type           | Options                                  |
|------------------|----------------|------------------------------------------|
| card\_id         | int            | FOREIGN KEY REFERENCES tbl_card \(card\_id\) |
| card\_file\_id   | int            | PRIMARY KEY NOT NULL AUTO\_INCREMENT     |
| card\_file\_type | varchar\(255\) | NOT NULL                                 |
| card\_file\_name | varchar\(255\) | NOT NULL                                 |

#### tbl_auth
| Field     | Type          | Options                                  |
|-----------|---------------|------------------------------------------|
| auth\_id  | int           | PRIMARY KEY NOT NULL AUTO\_INCREMENT     |
| project\_id  | int           | FOREIGN KEY REFERENCES tbl_project \(project\_id\) |
| user\_id  | varchar\(20\) | FOREIGN KEY REFERENCES tbl_user \(user\_id\) |
| authority | tinyint       | NOT NULL                                 |

- authority
    - 0: `R`, 1: `R` `W`

#### tbl_action
| Field        | Type          | Options                              |
|--------------|---------------|--------------------------------------|
| action\_id   | int           | PRIMARY KEY NOT NULL AUTO\_INCREMENT |
| action\_name | varchar\(20\) | NOT NULL                             |

#### tbl_log
| Field         | Type           | Options                                      |
|---------------|----------------|----------------------------------------------|
| log\_id       | int            | PRIMARY KEY NOT NULL AUTO\_INCREMENT         |
| project\_id   | int            | FOREIGN KEY REFERENCES tbl_project \(project\_id\) |
| created\_by   | varchar\(20\)  | FOREIGN KEY REFERENCES tbl_user \(user\_id\) |
| created\_time | timestamp      | DEFAULT CURRENT\_TIMESTAMP                   |
| target        | tinyint        | NOT NULL                                     |
| target\_id    | int            | NOT NULL                                     |
| action\_id    | int            | FOREIGN KEY REFERENCES tbl_action \(action\_id\) |
| log\_describe | varchar\(255\) | NOT NULL                                     |

- target
    - 0: column, 1: card
- target_id
    - ID of column or ID of card

#### tbl_target
| Field         | Type           | Options                                      |
|---------------|----------------|----------------------------------------------|
| target\_id    | tinyint        | PRIMARY KEY NOT NULL FOREIGN KEY REFERENCES tbl_log \(target)   |
| target\_name  | varchar\(50\)  | varchar(50) NOT NULL                         |

- target_id
    - 0: column, 1: card
- target_name
    - column, card

---

### Router
#### Common API Router
| Resource     | POST        | GET               | PUT             | DELETE                   |
|--------------|-------------|-------------------|-----------------|--------------------------|
| `/columns`     | 새 column 추가 | columns JSON 리턴   | Error 404       | Error 404                |
| `/columns/:id` | Error 404   | id column JSON 리턴 | id column 정보 업뎃 | "id column, cards 정보 삭제" |
| `/cards`       | 새 card 추가   | cards JSON 리턴     | Error 404       | Error 404                |
| `/cards/:id`   | Error 404   | id card JSON 리턴   | id card 정보 업뎃   | id card 정보 삭제            |
| `/logs`        | 새 log 추가    | logs JSON 리턴      | Error 404       | Error 404                |
| `/logs/:id`    | Error 404   | project id 해당 log JSON 리턴    | id log 정보 업뎃    | id log 정보 삭제             |
| `/projects`        | 새 project 추가    | projects JSON 리턴      | Error 404       | Error 404                |
| `/projects/:id`    | Error 404   | id 해당 project JSON 리턴    | id project 정보 업뎃    | id project 정보 삭제             |

- `/cards` `POST`: multer + ncloud object storage

#### Index Router
| Resource  | POST                                  | GET                                             |
|-----------|---------------------------------------|-------------------------------------------------|
| `/`         | Error 404                             | render index\.pug \(Login Page\)                |
| `/sign-in` | passport login - redirect `/todo` or `/` | redirect `/todo` or `/`                             |
| `/sign-up` | Error 404                             | render sign\-up\.pug \(Sign Up Page\)           |
| `/todo`     | Error 404                             | render todo\.pug \(Todo Page about login user\) |
| `/todo/:id` | Error 404                             | render todo\.pug \(Todo Page about user id\)    |

- `/todo/:id` `GET`: 해당 유저의 Todo에 들어가면 Todo cards가 존재하는데, 그 cards는 읽기 권한이 존재하는 유저에게만 보여야 함

#### Admin Router
| Resource     | POST        | GET               | PUT             | DELETE                   |
|--------------|-------------|-------------------|-----------------|--------------------------|
| `/`       | Erro 404   | render `admin.pug` (Admin Page)     | Error 404       | Error 404                |
| `/users`       | 새 user 추가   | users JSON 리턴     | Error 404       | Error 404                |
| `/users/:id`   | Error 404   | id user JSON 리턴   | id user 정보 업뎃   | id user 정보 삭제            |

- `/users/:id` `DELETE`: user 삭제시 해당 user의 모든 데이터 삭제해야 함