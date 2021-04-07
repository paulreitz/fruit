--------------- TABLES ------------------
CREATE TABLE fruit (
    id serial PRIMARY KEY,
    name varchar(256),
    calories real,
    carbohydrate real,
    fiber real,
    sugar real,
    fat real,
    protein real
);

CREATE TABLE nutrients (
    id serial PRIMARY KEY,
    name varchar(256)
);

CREATE TABLE fruit_nutrients (
    fruit_id integer REFERENCES fruit (id) on delete cascade on update cascade,
    nutrient_id integer REFERENCES nutrients (id) on delete cascade on update cascade,
    value integer
);

---------------- INITIALIZE DATA ----------------------
INSERT INTO nutrients (name) VALUES ('Calcium');
INSERT INTO nutrients (name) VALUES ('Copper');
INSERT INTO nutrients (name) VALUES ('Folate');
INSERT INTO nutrients (name) VALUES ('Iron');
INSERT INTO nutrients (name) VALUES ('Magnesium');
INSERT INTO nutrients (name) VALUES ('Manganese');
INSERT INTO nutrients (name) VALUES ('Phosphorus');
INSERT INTO nutrients (name) VALUES ('Potassium');
INSERT INTO nutrients (name) VALUES ('Selenium');
INSERT INTO nutrients (name) VALUES ('Sodium');
INSERT INTO nutrients (name) VALUES ('Vitamin A');
INSERT INTO nutrients (name) VALUES ('Vitamin B1');
INSERT INTO nutrients (name) VALUES ('Vitamin B2');
INSERT INTO nutrients (name) VALUES ('Vitamin B3');
INSERT INTO nutrients (name) VALUES ('Vitamin B5');
INSERT INTO nutrients (name) VALUES ('Vitamin B6');
INSERT INTO nutrients (name) VALUES ('Vitamin C');
INSERT INTO nutrients (name) VALUES ('Vitamin E');
INSERT INTO nutrients (name) VALUES ('Vitamin K');

------------------- TYPES ---------------------------
CREATE TYPE nutrient_value AS (
    id integer,
    name varchar(256),
    value integer
);

CREATE TYPE nutrient_input AS (
    nutrient_id integer,
    value integer
);

CREATE TYPE nutrient_type AS (
    id integer, 
    name varchar(256)
);

CREATE TYPE fruit_type AS (
    id integer,
    name varchar(256),
    calories real,
    carbohydrate real,
    fiber real,
    sugar real,
    fat real,
    protein real,
    nutrients nutrient_value[]
);

CREATE TYPE fruits AS (
    fruits fruit_type[]
);

CREATE TYPE nutrients_list AS (
    nutrients nutrient_type[]
);

------------- GET FRUITS ----------------
CREATE or replace function getFruit()
returns json as $getFruit$
declare
    result json;
    fruitRecord record;
    nutrientRecord record;
    nutrientsArray nutrient_value[];
    fruitsArray fruit_type[] = '{}';
    currentFruit integer = 1;
    currentNutrient integer;
begin
    for fruitRecord in select * from fruit loop
        nutrientsArray = '{}';
        currentNutrient = 1;
        for nutrientRecord in select nutrients.id, nutrients.name, fruit_nutrients.value from fruit_nutrients inner join nutrients on (fruit_nutrients.nutrient_id = nutrients.id) where fruit_nutrients.fruit_id=fruitRecord.id loop
            nutrientsArray[currentNutrient] = row(nutrientRecord.id, nutrientRecord.name, nutrientRecord.value)::nutrient_value;
            currentNutrient = currentNutrient + 1;
        end loop;
        fruitsArray[currentFruit] = row(
            fruitRecord.id,
            fruitRecord.name,
            fruitRecord.calories,
            fruitRecord.carbohydrate,
            fruitRecord.fiber,
            fruitRecord.sugar,
            fruitRecord.fat,
            fruitRecord.protein,
            nutrientsArray
        )::fruit_type;
        currentFruit = currentFruit + 1;
    end loop;
    result = row_to_json(row(fruitsArray)::fruits);
    return result;
end;
$getFruit$ language plpgsql;

CREATE or replace function getNutrientsList()
returns json as $getNutrientsList$
declare
    result json;
    nutrient record;
    nutrientsArray nutrient_type[] = '{}';
    current integer = 1;
begin
    for nutrient in select * from nutrients loop
        nutrientsArray[current] = row(nutrient.id, nutrient.name)::nutrient_type;
        current = current + 1;
    end loop;
    result = row_to_json(row(nutrientsArray)::nutrients_list);
    return result;
end;
$getNutrientsList$ language plpgsql;

-- select addFruit('Avacado', 322, 17.1, 13.5, 0.2, 29.5, 4, ARRAY[row(19,53)::nutrient_input,row(3,41)::nutrient_input,row(17,33)::nutrient_input,row(8,28)::nutrient_input,row(15,28)::nutrient_input]);
CREATE or replace function addFruit(
    fruitName varchar(256),
    fruitCalories real,
    fruitCarbohydrate real,
    fruitFiber real,
    fruitSugar real,
    fruitFat real,
    fruitProtein real,
    fruitNutrients nutrient_input[]
)
returns json as $addFruit$
declare
    result json;
    foundFruit record;
    fruitId integer;
begin
    select * from fruit into foundFruit where name=fruitName;
    if not found then
        insert into fruit (name,calories,carbohydrate,fiber,sugar,fat,protein) 
        VALUES (fruitName,fruitCalories,fruitCarbohydrate,fruitFiber,fruitSugar,fruitFat,fruitProtein) 
        returning id into fruitId;
        for ind in array_lower(fruitNutrients, 1)..array_upper(fruitNutrients, 1) loop
            insert into fruit_nutrients (fruit_id, nutrient_id, value)
            VALUES (fruitId, fruitNutrients[ind].nutrient_id, fruitNutrients[ind].value);
        end loop;
        select getFruit() into result;
        return result;
    end if;
end;
$addFruit$ language plpgsql;

CREATE or replace function updateFruit(
    fruitId integer,
    fruitName varchar(256),
    fruitCalories real,
    fruitCarbohydrate real,
    fruitFiber real,
    fruitSugar real,
    fruitFat real,
    fruitProtein real,
    fruitNutrients nutrient_input[]
)
returns json as $updateFruit$
declare
    result json;
begin
    update fruit set
    name=fruitName, 
    calories=fruitCalories,
    carbohydrate=fruitCarbohydrate,
    fiber=fruitFiber,
    sugar=fruitSugar,
    fat=fruitFat,
    protein=fruitProtein 
    where id=fruitId;
    DELETE FROM fruit_nutrients where fruit_id=fruitId;
    for ind in array_lower(fruitNutrients, 1)..array_upper(fruitNutrients, 1) loop
        insert into fruit_nutrients(fruit_id, nutrient_id, value) 
        VALUES (fruitId, fruitNutrients[ind].nutrient_id, fruitNutrients[ind].value);
    end loop;
    select getFruit() into result;
    return result;
end;
$updateFruit$ language plpgsql;