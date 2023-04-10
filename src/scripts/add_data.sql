-------------- INSERT CARTS --------------

insert into carts (id, user_id, created_at, updated_at, status)
values (uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'OPEN'); 

insert into carts (id, user_id, created_at, updated_at, status)
values (uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'OPEN'); 

insert into carts (id, user_id, created_at, updated_at, status)
values (uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'ORDERED'); 

insert into carts (id, user_id, created_at, updated_at, status)
values (uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'ORDERED'); 

insert into carts (id, user_id, created_at, updated_at, status)
values (uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'OPEN'); 

-------------- INSERT CART ITEMS --------------

insert into cart_items (cart_id, product_id, count)
values ('c2e73904-7788-4517-850e-324671a52e6d', uuid_generate_v4(), 3);


insert into cart_items (cart_id, product_id, count)
values ('a900d57b-e26e-4f90-9685-cd86b0265585', uuid_generate_v4(), 2);