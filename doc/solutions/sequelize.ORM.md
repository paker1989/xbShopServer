<!--
  database object relation mapping solution: sequelize
  https://sequelize.org/master/manual/getting-started.html
 -->

## model

A model in Sequelize has a name. This name _does not have to be the same_ name of the table it represents in the database. Usually, models have `singular names` (such as `User`) while tables have `pluralized names` (such as `Users`), although this is fully configurable.

-   Models can be defined in two equivalent ways in Sequelize:

1. Calling `sequelize.define(modelName, attributes, options)`
2. Extending `Model` and calling `init(attributes, options)`

-   After being defined, we can access our model with `sequelize.models.User`.
    [example](../../_test_/sequelize/createModel.test.js)
-   如果 table name 没有 preciser 的。默认加 s 是对应的 table name.

-   `freezeTableName: true`: force `table name` = `model name`

```javascript
// 或者globally设置
const sequelize = new Sequelize('sqlite::memory:', {
    define: {
        freezeTableName: true,
    },
});
```

## model sync

`model.sync(options)`: execute query to _sync database table to matach model_

-   `model.sync(true)`: drop table if exists
-   `model.sync({ alter: true })`: alter if necessary

-   或者直接 globally
    `sequelize.sync()`

```javascript
await sequelize.sync();

// or
await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
```

-   `model.drop()`, `sequelize.drop()`
-   `sequelize.sync({ force: true, match: /_test$/ });`
<!-- 只sync test database -->

-   默认都带`createAt`和`updateAt`， 可以设置带或者不带，改名字，只带一个:

```javascript
Foo.init(
    {
        /* attributes */
    },
    {
        sequelize,

        // don't forget to enable timestamps!
        timestamps: true,

        // I don't want createdAt
        createdAt: false,

        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updateTimestamp',
    }
);
```

## defaultValue

```javascript
sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        defaultValue: 'John Doe',
    },
});

sequelize.define('Foo', {
    bar: {
        type: DataTypes.DATETIME,
        defaultValue: Sequelize.NOW,
        // This way, the current date/time will be used to populate this column (at the moment of insertion)
    },
});
```

## datatypes

-   `uuid`: mysql 自动转化成 CHAR(36)

## data options

-   defaultvalue, type, allowNull, autoIncrement, primaryKey, comment

-   // You can specify a custom column name via the 'field' attribute:
    fieldWithUnderscores: { type: DataTypes.STRING, `field: 'field_with_underscores'` },

-   foreign key:

## class is es6 class， add static method to benefit

## instance of model

-   `build` (sync) -> `save` (async)
    or
-   `create()` shorthand
-   Deleting an instance: `await jane.destroy();`
-   reload an instance: `await jane.reload();` (从新 sync from database)
-   save _only some_ fileds:
    ```javascript
    const jane = await User.create({ name: 'Jane' });
    console.log(jane.name); // "Jane"
    console.log(jane.favoriteColor); // "green"
    jane.name = 'Jane II';
    jane.favoriteColor = 'blue';
    await jane.save({ fields: ['name'] });
    console.log(jane.name); // "Jane II"
    console.log(jane.favoriteColor); // "blue"
    // The above printed blue because the local object has it set to blue, but
    // in the database it is still "green":
    await jane.reload();
    console.log(jane.name); // "Jane II"
    console.log(jane.favoriteColor); // "green"
    ```
-   `increment/decrement`

    ```javascript
    const jane = await User.create({ name: 'Jane', age: 100 });
    const incrementResult = await jane.increment('age', { by: 2 });
    // Note: to increment by 1 you can omit the `by` option and just do `user.increment('age')`

    // In PostgreSQL, `incrementResult` will be the updated user, unless the option
    // `{ returning: false }` was set (and then it will be undefined).

    // In other dialects, `incrementResult` will be undefined. If you need the updated instance, you will have to call `user.reload()`.
    const jane = await User.create({ name: 'Jane', age: 100, cash: 5000 });
    await jane.increment({
        age: 2,
        cash: 100,
    });

    // If the values are incremented by the same amount, you can use this other syntax as well:
    await jane.increment(['age', 'cash'], { by: 2 });
    ```

## toJSON

```javascript
const jane = await User.create({ name: 'Jane' });
// console.log(jane); // Don't do this
console.log(jane.toJSON()); // This is good!
console.log(JSON.stringify(jane, null, 4)); // This is also good!
```

## query

-   Model.findAll(options)

```javascript
User.findAll({
    attributs: ['field_name', ['field', 'as_name']],
});

// 用count等命令
Product.findAll({
    attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar'],
});

// This is shorter, and less error prone because it still works if you add / remove attributes from your model later
Model.findAll({
    attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']],
    },
});

// exclude columns
Model.findAll({
    attributes: { exclude: ['baz'] },
});
```

-   用聚合命令的时候必须提供 alias(`n_hats`)

## where

-   implicitely use `Op.eq`, `Op.and`
-   如何用操作符

```javascript
Product.findAll({
    attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar'],
    where: {
        [or]: [{ productName: 'xu' }, { productName: 'bin' }],
        // or
        productName: {
            [or]: ['xu', 'bin'],
        },
    },
});

// complexe example
Post.findAll({
    where: {
        [Op.or]: [
            sequelize.where(sequelize.fn('char_length', sequelize.col('content')), 7),
            {
                content: {
                    [Op.like]: 'Hello%',
                },
            },
            {
                [Op.and]: [
                    { status: 'draft' },
                    sequelize.where(sequelize.fn('char_length', sequelize.col('content')), {
                        [Op.gt]: 10,
                    }),
                ],
            },
        ],
    },
});
```

## Update

```javascript
// Change everyone without a last name to "Doe"
await User.update(
    { lastName: 'Doe' },
    {
        where: {
            lastName: null,
        },
    }
);
```

## delete

```javascript
// Delete everyone named "Jane"
await User.destroy({
    where: {
        firstName: 'Jane',
    },
});
```

## bulk create

-   批量 create
-   默认不会 validate value。要 preciser`validate: true`,但是 decrease perfo.
-   可以 preciser `fields: ['username']`来 limiter insert 的 column

```javascript
const products = await Product.bulkCreate([{ productName: '1' }, { productName: '2' }]);
console.log(captains.length); // 2
```

## order & group

-   `order`: The order option takes an array of items to order the query by or a sequelize method. These items are themselves arrays in the form [column, direction]. The column will be escaped correctly and the direction will be checked in a whitelist of valid directions (such as ASC, DESC, NULLS FIRST, etc).

-   `group`

```javascript
Project.findAll({ group: 'name' });
// yields 'GROUP BY name'
```

## Limits and Pagination

```javascript
// Fetch 10 instances/rows
Project.findAll({ limit: 10 });

// Skip 8 instances/rows
Project.findAll({ offset: 8 });

// Skip 5 instances and fetch the 5 after that
Project.findAll({ offset: 5, limit: 5 });
```

## utility methods

-   `count`

```javascript
console.log(`There are ${await Project.count()} projects`);

const amount = await Project.count({
    where: {
        id: {
            [Op.gt]: 25,
        },
    },
});
console.log(`There are ${amount} projects with an id greater than 25`);
```

-   max, min and sum

```javascript
await User.max('age'); // 40
await User.max('age', { where: { age: { [Op.lt]: 20 } } }); // 10
await User.min('age'); // 5
await User.min('age', { where: { age: { [Op.gt]: 5 } } }); // 10
await User.sum('age'); // 55
await User.sum('age', { where: { age: { [Op.gt]: 5 } } }); // 50
```

## finder methods

finder 都是`Model`的 methods。by default 已经是 wrapper 成 object 了。_inefficient_, 可以 passer `{raw: true}`返回`plain text`

-   `findAll`
-   `findByPk`
-   `findOne`
-   `findOrCreate`: The method findOrCreate will create an entry in the table unless it can find one fulfilling the query options. In both cases, it will return an instance (either the found instance or the created instance) and _a boolean indicating whether that instance was created or already existed_.

The `where` option is considered for `finding the entry`, and the `defaults` option is used to define what must be created in case nothing was found. If the defaults do not contain values for every column, Sequelize will take the values given to where (if present).

-   `findAndCountAll`: combine `find`和`count`, 对于 pagniation 和 limit 很有用

```javascript
const { rows, count } = await Product.findAndCountAll({
    where: {
        productName: 'xu',
    },
    offset: 12,
    limit: 1,
});
```

## getter, setters

-   vitural attributs. 如下:
-   `getDataValue`

```javascript
const User = sequelize.define('user', {
    // Let's say we wanted to see every username in uppercase, even
    // though they are not necessarily uppercase in the database itself
    username: {
        type: DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue(username); // 得到raw db value
            return rawValue ? rawValue.toUpperCase() : null;
        },
    },
});

const user = User.build({ username: 'superValue' });
console.log(user.username); // SUPERVALUE
console.log(user.getDataValue(username)); // superValue
```

-   set():

```javascript
const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        set(value) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            // Using the username as a salt is better.
            this.setDataValue('password', hash(this.username + value));
        },
    },
});
```

## virtual field

-   DataTypes.Virtual

```javascript
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        },
    },
});
```

## validations & constraints

-   val. is at js level, no sql query is performed if val. fails
-   constraints is on sql level, sql still executed and returned error from sql
    -   e.g. `unique` constraints
    ```javascript
    /* When this model is synchronized (by calling sequelize.sync for example), the username field will be created in the table as `name` TEXT UNIQUE, and an attempt to insert an username that already exists there will throw a SequelizeUniqueConstraintError. */
    /* ... */
    const user = {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
    }; /* ... */
    ```
-   `validate()`
    Validations are automatically run on `create`, `update` and `save`. You can also call validate() to manually validate an instance.

    ```javascript
      sequelize.define('foo', {
    bar: {
     type: DataTypes.STRING,
     validate: {
       is: /^[a-z]+$/i,          // matches this RegExp
       is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
       not: /^[a-z]+$/i,         // does not match this RegExp
       not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
       isEmail: true,            // checks for email format (foo@bar.com)
       isUrl: true,              // checks for url format (http://foo.com)
       isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
       isIPv4: true,             // checks for IPv4 (129.89.23.1)
       isIPv6: true,             // checks for IPv6 format
       isAlpha: true,            // will only allow letters
       isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
       isNumeric: true,          // will only allow numbers
       isInt: true,              // checks for valid integers
       isFloat: true,            // checks for valid floating point numbers
       isDecimal: true,          // checks for any numbers
       isLowercase: true,        // checks for lowercase
       isUppercase: true,        // checks for uppercase
       notNull: true,            // won't allow null
       isNull: true,             // only allows null
       notEmpty: true,           // don't allow empty strings
       equals: 'specific value', // only allow a specific value
       contains: 'foo',          // force specific substrings
       notIn: [['foo', 'bar']],  // check the value is not one of these
       isIn: [['foo', 'bar']],   // check the value is one of these
       notContains: 'bar',       // don't allow specific substrings
       len: [2,10],              // only allow values with length between 2 and 10
       isUUID: 4,                // only allow uuids
       isDate: true,             // only allow date strings
       isAfter: "2011-11-05",    // only allow date strings after a specific date
       isBefore: "2011-11-05",   // only allow date strings before a specific date
       max: 23,                  // only allow values <= 23
       min: 23,                  // only allow values >= 23
       isCreditCard: true,       // check for valid credit card numbers

       // Examples of custom validators:
       isEven(value) {
         if (parseInt(value) % 2 !== 0) {
           throw new Error('Only even values are allowed!');
         }
       }
       isGreaterThanOtherField(value) {
         if (parseInt(value) <= parseInt(this.otherField)) {
           throw new Error('Bar must be greater than otherField.');
         }
       }
     }
    }
    });
    ```

-   `allowNull`

    1. if `true` and set null, build-in validators will not run, but custom validators will run
    2. if `false` and set null, all validators will be skipped and a ValidationError will be thrown.
    3. You also can conditionally allow null values, with a custom validator, since it won't be skipped.
    4. You can customize allowNull error message by setting the notNull validator:

    ```js
    class User extends Model {}
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Please enter your name',
                    },
                },
            },
        },
        { sequelize }
    );
    ```

    5. 可以在 model 层面定义 validator, 联动 check

    ```js
    class Place extends Model {}
    Place.init(
        {
            name: Sequelize.STRING,
            address: Sequelize.STRING,
            latitude: {
                type: DataTypes.INTEGER,
                validate: {
                    min: -90,
                    max: 90,
                },
            },
            longitude: {
                type: DataTypes.INTEGER,
                validate: {
                    min: -180,
                    max: 180,
                },
            },
        },
        {
            sequelize,
            validate: {
                bothCoordsOrNone() {
                    if ((this.latitude === null) !== (this.longitude === null)) {
                        throw new Error('Either both latitude and longitude, or neither!');
                    }
                },
            },
        }
    );
    ```

    -   somePlaces.validate()可能返回:

    ```json
    {
        "latitude": ["Invalid number: latitude"],
        "bothCoordsOrNone": ["Either both latitude and longitude, or neither!"]
    }
    ```

    Such validation could _have also been done_ with a custom validator defined on a single attribute (such as the latitude attribute, by checking (value === null) !== (this.longitude === null)), but the model-wide validation approach is _cleaner_.

## rawQuery

```js
const [results, metadata] = await sequelize.query('UPDATE users SET y = 42 WHERE x = 12');
// Results will be an empty array and metadata will contain the number of affected rows.
```

-   options: [api](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-query)

    1. types
    2. model: A second option is the model. If you pass a model the returned data will be instances of that model.
    3. `nest: true`: dotted attributs

    ```js
    const { QueryTypes } = require('sequelize');
    const records = await sequelize.query('select 1 as `foo.bar.baz`', {
      nest: true,
      type: QueryTypes.SELECT
    });
    console.log(JSON.stringify(records[0], null, 2));
    /*
    {
      "foo": {
        "bar": {
          "baz": 1
        }
      }
    }
     * /
    ```

-   replacement: 两种方式: ? and :key

        ```js
        const { QueryTypes } = require('sequelize');
        await sequelize.query('SELECT * FROM projects WHERE status = ?', {
            replacements: ['active'],
            type: QueryTypes.SELECT,
        });

        await sequelize.query('SELECT * FROM projects WHERE status = :status', {
            replacements: { status: 'active' },
            type: QueryTypes.SELECT,
        });

        await sequelize.query('SELECT * FROM projects WHERE status IN(:status)', {
            replacements: { status: ['active', 'inactive'] },
            type: QueryTypes.SELECT,
        });

        await sequelize.query(
          'SELECT \* FROM users WHERE name LIKE :search_name',
          {
          replacements: { search_name: 'ben%' },
          type: QueryTypes.SELECT
          }
          );

    ```

    ```

-   bind parameters

```js
await sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $1', {
    bind: ['active'],
    type: QueryTypes.SELECT,
});

await sequelize.query(
    'SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
    {
        bind: { status: 'active' },
        type: QueryTypes.SELECT,
    }
);
```

## Associations

-   3 types of assoc.: `one-to-one`, `one-to-many`, `many-to-many`
-   apis: `hasOne`, `belongsTo`, `hasMany`, `belongsToMany`

```js
const A = sequelize.define('A' /* ... */);
const B = sequelize.define('B' /* ... */);

A.hasOne(B); // A HasOne B, automatically create fk in B;
A.belongsTo(B); // A BelongsTo B, automatically create fk in A;
A.hasMany(B); // A HasMany B, automatically create fk in B;
A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C, automatically create model C
```

-   above: A is `source model`, B is `target model`

## oneToOne

```js
Foo.hasOne(Bar);
Bar.belongsTo(Foo);
```

-   on `delete`和`update`:
    ```js
    Foo.hasOne(Bar, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    });
    Bar.belongsTo(Foo);
    ```
-   The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL (default).
-   define fk name:
    ```js
    Foo.hasOne(Bar);
    Bar.belongsTo(Foo, {
        foreignKey: {
            name: 'myFooId',
        },
    });
    ```
    [reference](https://sequelize.org/master/manual/assocs.html)

## oneToMany

    ```js
    Team.hasMany(Player, {
        foreignKey: 'clubId',
    });
    Player.belongsTo(Team);
    ```

## manyToMany

-   through `junction table`

```js
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });
```

-   也可以直接`through`一个`Model`, nothing will be created automatically

## fetching associations

-   `eager loading`和`lazy loading`：前者一次性全 fetch。后者 invoke 才 fetch
    `lazy loading`

```js
const awesomeCaptain = await Captain.findOne({
    where: {
        name: 'Jack Sparrow',
    },
});
// Do stuff with the fetched captain
console.log('Name:', awesomeCaptain.name);
console.log('Skill Level:', awesomeCaptain.skillLevel);
// Now we want information about his ship!
const hisShip = await awesomeCaptain.getShip();
// Do stuff with the ship
console.log('Ship Name:', hisShip.name);
console.log('Amount of Sails:', hisShip.amountOfSails);
```

-   通过`include`关键字 perform eager loading

```js
const awesomeCaptain = await Captain.findOne({
    where: {
        name: 'Jack Sparrow',
    },
    include: Ship,
});
```

-   Note: The save() instance method is _not aware of associations_. In other words, if you change a value from a child object that was eager loaded along a parent object, calling save() on the parent will completely ignore the change that happened on the child.

## setup fk

1. default setup

```js
// Eager Loading is done by passing the model to `include`:
console.log((await Ship.findAll({ include: Captain })).toJSON());
// Or by providing the associated model name:
console.log((await Ship.findAll({ include: 'captain' })).toJSON());

// Also, instances obtain a `getCaptain()` method for Lazy Loading:
const ship = Ship.findOne();
console.log((await ship.getCaptain()).toJSON());
```

2.provide fk

```js
Ship.belongsTo(Captain, { foreignKey: 'bossId' });
```

3. 或者 provide an alias, then fk will be `aliasId`
   定 alias 很有用的 case 在于 when you need to define two different associations between the same models. For example, if we have the models Mail and Person, we may want to associate them twice, to represent the `sender` and `receiver` of the Mail.

```js
Ship.belongsTo(Captain, { as: 'leader' }); // This creates the `leaderId` foreign key in Ship.
console.log(
    (
        await Ship.findAll({
            include: {
                model: Captain,
                as: 'leader',
            },
        })
    ).toJSON()
);

// Also, instances obtain a `getLeader()` method for Lazy Loading:
const ship = Ship.findOne();
console.log((await ship.getLeader()).toJSON());
```

When defining an alias for a hasOne or belongsTo association, you should use the `singular` form of a word (such as leader, in the example above). On the other hand, when defining an alias for hasMany and belongsToMany, you should use the `plural` form. Defining aliases for Many-to-Many relationships (with belongsToMany) is covered in the Advanced Many-to-Many Associations guide.

同时定义 alias 和 fk volontairely

```js
Ship.belongsTo(Captain, { as: 'leader', foreignKey: 'bossId' }); // This creates the `bossId` foreign key in Ship.

// Since an alias was defined, eager Loading doesn't work by simply passing the model to `include`:
console.log((await Ship.findAll({ include: Captain })).toJSON()); // Throws an error
// Instead, you have to pass the alias:
console.log((await Ship.findAll({ include: 'leader' })).toJSON());
// Or you can pass an object specifying the model and alias:
console.log(
    (
        await Ship.findAll({
            include: {
                model: Captain,
                as: 'leader',
            },
        })
    ).toJSON()
);

// Also, instances obtain a `getLeader()` method for Lazy Loading:
const ship = Ship.findOne();
console.log((await ship.getLeader()).toJSON());
```

## default methods/mixins for associations

根据不同的关系，两个 model 之间有一些默认的 methods

-   Foo.hasOne(Bar)
    1. fooInstance.getBar()
    2. fooInstance.setBar()
    3. fooInstance.createBar()
-   Foo.belongsTo(Bar)
    1. fooInstance.getBar()
    2. fooInstance.setBar()
    3. fooInstance.createBar()
-   Foo.hasMany(Bar)
    1. fooInstance.getBars()
    2. fooInstance.countBars()
    3. fooInstance.hasBar()
    4. fooInstance.hasBars()
    5. fooInstance.setBars()
    6. fooInstance.addBar()
    7. fooInstance.addBars()
    8. fooInstance.removeBar()
    9. fooInstance.removeBars()
    10. fooInstance.createBar()
-   Foo.belongsToMany(Bar, { through: Baz }): The same ones from `Foo.hasMany(Bar)`

-   If an alias was defined, it will be used instead of the model name to form the method names. For example:
    ```js
    Task.hasOne(User, { as: 'Author' });
    taskInstance.getAuthor();
    taskInstance.setAuthor();
    taskInstance.createAuthor();
    ```

## 如何设定非 pk 的 field 为 fk

-   belongsTo

```js
const Ship = sequelize.define('ship', { name: DataTypes.TEXT }, { timestamps: false });
const Captain = sequelize.define(
    'captain',
    {
        name: { type: DataTypes.TEXT, unique: true },
    },
    { timestamps: false }
);
Ship.belongsTo(Captain, { targetKey: 'name', foreignKey: 'captainName' });
// This creates a foreign key called `captainName` in the source model (Ship)
// which references the `name` field from the target model (Captain).

// now we can do
await Captain.create({ name: 'Jack Sparrow' });
const ship = await Ship.create({ name: 'Black Pearl', captainName: 'Jack Sparrow' });
console.log((await ship.getCaptain()).name); // "Jack Sparrow"
```

-   for `hasOne`, `hasMany`, `belongsToMany`:
    [example](https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances)

## indexs

```js
const User = sequelize.define(
    'User',
    {
        /* attributes */
    },
    {
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['email'],
            },

            // Creates a gin index on data with the jsonb_path_ops operator
            {
                fields: ['data'],
                using: 'gin',
                operator: 'jsonb_path_ops',
            },
        ],
    }
);
```

## transaction

-   unmanaged transaction

```js
// First, we start a transaction and save it into a variable
const t = await sequelize.transaction();

try {
    // Then, we do some calls passing this transaction as an option:

    const user = await User.create(
        {
            firstName: 'Bart',
            lastName: 'Simpson',
        },
        { transaction: t }
    );

    await user.addSibling(
        {
            firstName: 'Lisa',
            lastName: 'Simpson',
        },
        { transaction: t }
    );

    // If the execution reaches this line, no errors were thrown.
    // We commit the transaction.
    await t.commit();
} catch (error) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await t.rollback();
}
```

-   managed transaction

```js
try {
    const result = await sequelize.transaction(async (t) => {
        const user = await User.create(
            {
                firstName: 'Abraham',
                lastName: 'Lincoln',
            },
            { transaction: t }
        );

        await user.setShooter(
            {
                firstName: 'John',
                lastName: 'Boothe',
            },
            { transaction: t }
        );

        return user;
    });

    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback (the `user`, in this case)
} catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
}
```

-   installer `cls-hooked`, namingspace，不用手动 passer transaction

```js
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-very-own-namespace');
const Sequelize = require('sequelize');
Sequelize.useCLS(namespace);
sequelize.transaction((t1) => {
    namespace.get('transaction') === t1; // true
});

sequelize.transaction((t2) => {
    namespace.get('transaction') === t2; // true
});

sequelize.transaction((t1) => {
    // With CLS enabled, the user will be created inside the transaction
    return User.create({ name: 'Alice' });
});
```

## afterCommitHook

```js
// managed commit
await sequelize.transaction(async (t) => {
    t.afterCommit(() => {
        // logic
    });
});
```

可以和`model`的`hook`配合

```js
User.afterSave((instance, options) => {
  if (options.transaction) {
    // Save done within a transaction, wait until transaction is committed to
    // notify listeners the instance has been saved
    options.transaction.afterCommit(() => /* Notify */)
    return;
  }
  // Save done outside a transaction, safe for callers to fetch the updated model
  // Notify
});
```

## hooks

-   hooks 是`Model`属性
-   3 种方法添加 hooks

```js
const Article = sequelize.define(
    'Article',
    {
        articleId: {
            type: DataTypes.STRING,
        },
    },
    {
        hooks: {
            beforeValidate: (article, options) => {
                article.randomId = Math.random();
            },
        },
    }
);

// method 2
Article.addHook('afterSave', (article, options) => {
    article.randomId = Math.random();
});

// method 3
Article.afterCreate(async (article, options) => {
    const hashedPassword = '1234';
    Article.password = hashedPassword;
});

User.afterValidate('myHookAfter', (user, options) => {
    user.username = 'Toni';
});
```

-   删除 hooks

```js
class Book extends Model {}
Book.init(
    {
        title: DataTypes.STRING,
    },
    { sequelize }
);

Book.addHook('afterCreate', 'notifyUsers', (book, options) => {
    // ...
});

Book.removeHook('afterCreate', 'notifyUsers');
```

-   You can have many hooks with same name. Calling .removeHook() will remove all of them.
-   `default hooks`：`sequelize`上定义 global hooks。可以被 model 自定义 hook 覆盖

```js
const sequelize = new Sequelize(..., {
  define: {
    hooks: {
      beforeCreate() {
        // Do stuff
      }
    }
  }
});
```

-   `permanent hook`: 也是全局 hook。不会被覆盖，总是执行

```js
sequelize.addHook('beforeCreate', () => {
    // Do stuff
});
// or
const User = sequelize.define('User', {});
const Project = sequelize.define(
    'Project',
    {},
    {
        hooks: {
            beforeCreate() {
                // Do other stuff
            },
        },
    }
);
await User.create({}); // Runs the global hook
await Project.create({}); // Runs its own hook, followed by the global hook
```

## connection hooks

-   sequelize 提供 4 个`connection hooks`
    [reference](https://sequelize.org/master/manual/hooks.html)

## model hooks

-   bulkActions 的 hooks。e.g. `YourModel.beforeBulkCreate(callback)`, 不会执行 instance 的 hook。如果需要，可以
    pass the `{ individualHooks: true }` option to the query call.

-   运用 transaction 和 hook

```js
// transaction et hook
User.addHook('afterCreate', async (user, options) => {
    // We can use `options.transaction` to perform some other call
    // using the same transaction of the call that triggered this hook
    await User.update(
        { mood: 'sad' },
        {
            where: {
                id: user.id,
            },
            transaction: options.transaction,
        }
    );
});

const linkCreate = async () => {
    sequelize.transaction((t) => {
        User.create({ userName: 'xubin' }, { transaction: t });
    });
};
```

## internal transaction

It is very important to recognize that sequelize may make use of transactions internally for certain operations such as Model.findOrCreate. If your hook functions execute read or write operations that rely on the object's presence in the database, or modify the object's stored values like the example in the preceding section, you should always specify { transaction: options.transaction }:

If a transaction was used, then { transaction: options.transaction } will ensure it is used again;
Otherwise, { transaction: options.transaction } will be equivalent to { transaction: undefined }, which won't use a transaction (which is ok).
This way your hooks will always behave correctly.
