CREATE database ThinkFood charset utf8;
use ThinkFood;

DROP TABLE IF EXISTS user;
create table user(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
deactivate_on datetime,
is_active boolean default true,
first_name varchar(255) default '',
last_name varchar(255) default '',
username varchar(255) default '',
password varchar(512) default '',
profile_pic varchar(512) default '',
facebook_id varchar(512) default '',
last_login datetime,
email_verification_token varchar(512) default '',
is_email_verified boolean default false,
mobile_verification_token varchar(6) default '',
is_mobile_verified boolean default false,
is_facebook_user boolean,
device_id varchar(512) default '' comment 'Will be used for push notification purpose',
follow_count int,
primary key (id),
unique key (username)
)charset=utf8 auto_increment=1;

DROP TABLE IF EXISTS user_follower;
CREATE TABLE user_follower(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
is_active boolean default true,
user_id int,
follower_id int,
primary key (id),
unique key(user_id , follower_id ),
FOREIGN KEY (user_id) REFERENCES user(id)
);

DROP TABLE IF EXISTS food_detail;
create table food_detail(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
is_active boolean default true,
user_id int,
item_name varchar(255) default '',
item_description text,
item_price float,
likes_count int default 0,
primary key (id),
FOREIGN KEY (user_id) REFERENCES user(id)
)charset=utf8 auto_increment=1;

DROP TABLE IF EXISTS food_image;
create table food_image(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
is_active boolean default true,
food_id int,
picture varchar(255) default '',
primary key (id),
FOREIGN KEY (food_id) REFERENCES food_detail(id)
)charset=utf8 auto_increment=1;

DROP TABLE IF EXISTS user_bookmark;
CREATE TABLE user_bookmark(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
is_active boolean default true,
user_id int,
food_id int,
primary key (id),
unique key(user_id , food_id ),
FOREIGN KEY (food_id) REFERENCES food_detail(id),
FOREIGN KEY (user_id) REFERENCES user(id)
)charset=utf8 auto_increment=1;

DROP TABLE IF EXISTS user_food_like;
CREATE TABLE user_food_like(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
is_active boolean default true,
user_id int,
food_id int,
primary key (id),
unique key(user_id , food_id ),
FOREIGN KEY (food_id) REFERENCES food_detail(id),
FOREIGN KEY (user_id) REFERENCES user(id)
)charset=utf8 auto_increment=1;

DROP TABLE IF EXISTS user_food_comment;
CREATE TABLE user_food_comment(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
is_active boolean default true,
user_id int,
food_id int,
parent_id int,
message text,
primary key (id),
FOREIGN KEY (food_id) REFERENCES food_detail(id),
FOREIGN KEY (user_id) REFERENCES user(id)
)charset=utf8 auto_increment=1;

DROP TABLE IF EXISTS tag;
CREATE TABLE tag(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
deactivate_on datetime,
is_active boolean default true,
tag_name varchar(100) default '',
primary key (id),
unique key(tag_name)
)charset=utf8 auto_increment=1;


DROP TABLE IF EXISTS food_tag_mapping;
CREATE TABLE food_tag_mapping(
id int not null auto_increment,
created_on datetime,
updated_on timestamp default now(),
deactivate_on datetime,
is_active boolean default true,
food_id int,
tag_id int,
primary key (id),
UNIQUE KEY(food_id, tag_id),
FOREIGN KEY (food_id) REFERENCES food_detail(id),
FOREIGN KEY (tag_id) REFERENCES tag(id)
)charset=utf8 auto_increment=1;