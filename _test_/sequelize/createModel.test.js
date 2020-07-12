const { gzipSync, gunzipSync } = require('zlib');
const { Sequelize, DataTypes, Model, Op, QueryTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { or } = Op;

const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {}
);

console.log(User === sequelize.models.User); // true

// or
class Product extends Model {}

Product.init(
    {
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pkField: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'pk_field',
        },
        fkField: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                // This is the column name of the referenced model
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'products',
    }
);
// Internally, sequelize.define calls Model.init, so both approaches are essentially equivalent.
Product.build({
    productName: '支付宝',
    fkField: 12,
});

(async () => {
    await Product.save();
})();

Product.findAll({
    attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar'],
    where: {
        [or]: [{ productName: 'xu' }, { productName: 'bin' }],
        // or
        productName: {
            [or]: ['xu', 'bin'],
        },
    },
    order: [
        ['productName', 'DESC'],
        // Will order by max(age) DESC
        [sequelize.fn('max', sequelize.col('age')), 'DESC'],
    ],
});

const validateCreate = async () => {
    const results = await Product.bulkCreate([{ productName: '1' }, { productName: '2' }, { productName: '3' }], {
        validate: true,
    });
    const { rows, count } = await Product.findAndCountAll({
        where: {
            productName: 'xu',
        },
        offset: 12,
        limit: 1,
    });
};

const Post = sequelize.define('Post', {
    content: {
        type: DataTypes.TEXT,
        get() {
            const storedValue = this.getDataValue('content');
            const gzipBuffer = Buffer.from(storedValue, 'base64');
            const unzipbuffer = gunzipSync(gzipBuffer);
            return unzipbuffer.toString();
        },
        set(value) {
            const gzippedBuffer = gzipSync(value);
            this.setDataValue('content', gzippedBuffer.toString('base64'));
        },
    },
});

// query
const results = sequelize.query('select * from users', { type: QueryTypes.SELECT, model: User });

const _transaction = async () => {
    try {
        await sequelize.transaction(async (t) => {
            t.afterCommit(() => {
                // logic
            });
        });
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
    } catch (err) {
        console.log(err);
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
    }
};

// method1
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
