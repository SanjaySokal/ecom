const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailer = require("nodemailer");
const app = express();
const fileUpload = require("express-fileupload");
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.listen(4000);

const connection = mysql.createConnection({
    host: "localhost",
    user: "sokalit1_art",
    password: "Sanjay@8295",
    database: "sokalit1_art",
    dateStrings: true
})

var trans = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "softingart@gmail.com",
        pass: "avuluuwvwsayyoha"
    }
})

const sendMail = (subject, to, message) => {
    var data = {
        from: "softingart@gmail.com",
        cc: "contact@softingart.com",
        to: to,
        subject: subject,
        html: message
    }
    var transport = trans;

    transport.sendMail(data, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("1");
        }
    })
}


function uploadImage(path, name, file) { file.mv(path, err => { if (!err) return 1; else return 0; }); }

app.get("/", (req, resp) => {
    resp.send("working");
})

app.post("/login", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}' AND verify = '1'`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                resp.send({ status: data });
            } else {
                resp.send({ status: "user not exist" });
            }
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.post("/check-login", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}' AND verify = '1'`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                resp.send({ status: data });
            } else {
                resp.send({ status: "user not exist" });
            }
        } else {
            resp.send({ status: "failed" });
        }
    })
})


app.post("/register", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                resp.send({ status: "user exist" });
            } else {
                connection.query(`INSERT INTO user(name, email, phone, password, address, pincode, verify, city, state, otp, type, date) VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.password}','${req.body.address}','${req.body.pincode}','0','${req.body.city}','${req.body.state}','${req.body.otp}','0','${req.body.date}')`, (err2, data2) => {
                    if (!err2) {
                        resp.send({ status: "success" });
                        message = `<html><head><style>
                            * {margin: 0;padding: 0;box-sizing: border-box;}
                            .contain {background-color: #f7f7f7;padding: 40px 20px;text-align: center;}
                            h1 {font-size: 40px;margin: 20px 0;}
                            .btn {
                                color: #fff;background: linear-gradient(45deg,#0053fe,#f100fe,#f100fe,#f100fe);border: none;border-radius: 5px;font-size: 18px;cursor: pointer;margin-top: 15px;margin-bottom: 15px;display: inline-block;font-weight: 600;outline: none;padding: 15px 25px;text-decoration: none;}
                        </style>
                        </head><body>
                        <div class="contain">
                            <p style="font-size:20px">
                                Hi, ${req.body.email} Thanks for be a member of SoftingArt.com. To verify your email click the link given
                                below and enter the code given below.
                            </p>
                            <h1>${req.body.otp}</h1>
                            <a style="color:#fff;" class="btn" href="https://softingart.com/verify/${req.body.email}">Verify Now</a>
                            <p>Thankyou, Have a great day.</p>
                        </div></body></html>`;

                        sendMail(`Verify Email For ${req.body.email}`, req.body.email, message);

                    } else {
                        resp.send({ status: "failed" });
                    }
                })
            }
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.post("/forgot", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                var otp = Math.round(Math.random() * 100000)
                connection.query(`UPDATE user SET otp = '${otp}' WHERE email = '${req.body.email}'`, (err2, data2) => {
                    if (!err2) {
                        resp.send({ status: "success" });
                        message = `<html><head><style>
                        * {margin: 0;padding: 0;box-sizing: border-box;}
                        .contain {background-color: #f7f7f7;padding: 40px 20px;text-align: center;}
                        h1 {font-size: 40px;margin: 20px 0;}
                            .btn {
                                color: #fff;background: linear-gradient(45deg,#0053fe,#f100fe,#f100fe,#f100fe);border: none;border-radius: 5px;font-size: 18px;cursor: pointer;margin-top: 15px;margin-bottom: 15px;display: inline-block;font-weight: 600;outline: none;padding: 15px 25px;text-decoration: none;}
                        </style>
                        </head><body>
                        <div class="contain">
                            <p style="font-size:20px">Hi, ${req.body.email} Thanks for be a member of SoftingArt.com. To change your password click the link given below and enter the code given below.</p>
                            <h1>${otp}</h1>
                            <a style="color:#fff;" class="btn" href="https://softingart.com/change-password/${req.body.email}">Change Now</a>
                            <p>Thankyou, Have a great day.</p>
                            </div></body></html>`;

                        sendMail(`Forgot Password For ${req.body.email}`, req.body.email, message);

                    } else {
                        resp.send({ status: "failed" });
                    }
                })
            } else {
                resp.send({ status: "failed" });
            }
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.post("/change-now", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}' AND otp = '${req.body.otp}' AND verify = '1'`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                connection.query(`UPDATE user SET password = '${req.body.password}' WHERE email = '${req.body.email}'`, (error, data2) => {
                    if (!error) {
                        resp.send({ status: "success" });
                        message = `<html><head><style>
                        * {margin: 0;padding: 0;box-sizing: border-box;}
                        .contain {background-color: #f7f7f7;padding: 40px 20px;text-align: center;}
                        h1 {font-size: 40px;margin: 20px 0;}
                            .btn {
                                color: #fff;background: linear-gradient(45deg,#0053fe,#f100fe,#f100fe,#f100fe);border: none;border-radius: 5px;font-size: 18px;cursor: pointer;margin-top: 15px;margin-bottom: 15px;display: inline-block;font-weight: 600;outline: none;padding: 15px 25px;text-decoration: none;}
                        </style>
                        </head><body>
                        <div class="contain">
                            <p style="font-size:20px">Hi, ${req.body.email} Thanks for be a member of SoftingArt.com. Your password has been changed successfully. Click the below link to login.</p>
                            <a style="color:#fff;" class="btn" href="https://softingart.com/login">Login Here</a>
                            <p>Thankyou, Have a great day.</p>
                            </div></body></html>`;

                        sendMail(`Your password has changed`, req.body.email, message);
                    }
                })
            } else {
                resp.send({ status: "failed" });
            }
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.post("/verify-now", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}' AND otp = '${req.body.otp}'`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                connection.query(`UPDATE user SET verify = '1' WHERE email = '${req.body.email}'`, (error, data2) => {
                    if (!error) {
                        resp.send({ status: "success" });
                        message = `<html><head><style>
                        * {margin: 0;padding: 0;box-sizing: border-box;}
                        .contain {background-color: #f7f7f7;padding: 40px 20px;text-align: center;}
                        h1 {font-size: 40px;margin: 20px 0;}
                            .btn {
                                color: #fff;background: linear-gradient(45deg,#0053fe,#f100fe,#f100fe,#f100fe);border: none;border-radius: 5px;font-size: 18px;cursor: pointer;margin-top: 15px;margin-bottom: 15px;display: inline-block;font-weight: 600;outline: none;padding: 15px 25px;text-decoration: none;}
                        </style>
                        </head><body>
                        <div class="contain">
                            <p style="font-size:20px">Hi, ${req.body.email} Thanks for be a member of SoftingArt.com. Your email has been verified successfully. Click the below link to login.</p>
                            <a style="color:#fff;" class="btn" href="https://softingart.com/login">Login Here</a>
                            <p>Thankyou, Have a great day.</p>
                            </div></body></html>`;

                        sendMail(`Your email has verified`, req.body.email, message);
                    }
                })
            } else {
                resp.send({ status: "failed" });
            }
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/products", (req, resp) => {
    connection.query("SELECT * FROM products", (err, data) => {
        resp.send(data);
    })
})

app.get("/product/:email/:id", (req, resp) => {
    connection.query(`SELECT products.id, products.name, products.price, cart.number, cart.total FROM cart INNER JOIN products ON products.id = cart.product_id INNER JOIN user ON user.id = cart.costumer_email WHERE user.email = "${req.params.email}" && cart.product_id = "${req.params.id}";`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    });
})

app.get("/single-product/:id", (req, resp) => {
    connection.query(`SELECT products.name, products.id, products.price, products.image, products.catagory, products.desc, products.small, products.del, catagories.catagory_name, catagories.link FROM catagories INNER JOIN products ON catagories.id = products.catagory WHERE products.id = '${req.params.id}'`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/search-product/:search", (req, resp) => {
    connection.query(`SELECT * FROM products WHERE id = '${req.params.search}' OR name LIKE '%${req.params.search}%' ORDER BY id DESC`, (err, data) => {
        resp.send(data);
    })
})

app.get("/products/:start/:end", (req, resp) => {
    connection.query(`SELECT * FROM products LIMIT ${req.params.start}, ${req.params.end}`, (err, data) => {
        resp.send(data);
    })
})

app.get("/account/:email", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.params.email}'`, (err, data) => resp.send(data));
})

app.get("/recent-order/:email", (req, resp) => {
    connection.query(`SELECT orders.id as orderid, products.id as products_id, products.name as products_name, orders.total, products.price FROM orders INNER JOIN products ON orders.product_id = products.id INNER JOIN user ON user.id = orders.email WHERE user.email = '${req.params.email}' AND orders.status = '0' ORDER BY orders.date DESC;`, (err, data) => resp.send(data));
})

app.get("/completed-order/:email", (req, resp) => {
    connection.query(`SELECT orders.id as orderid, products.id as products_id, products.name as products_name, orders.total, products.price FROM orders INNER JOIN products ON orders.product_id = products.id INNER JOIN user ON user.id = orders.email WHERE user.email = '${req.params.email}' AND orders.status = '1' ORDER BY orders.date DESC;`, (err, data) => resp.send(data));
})

app.get("/cancelled-order/:email", (req, resp) => {
    connection.query(`SELECT orders.id as orderid, products.id as products_id, products.name as products_name, orders.total, products.price FROM orders INNER JOIN products ON orders.product_id = products.id INNER JOIN user ON user.id = orders.email WHERE user.email = '${req.params.email}' AND orders.status = '2' ORDER BY orders.date DESC;`, (err, data) => resp.send(data));
})

app.get("/cancel-order/:id/:email", (req, resp) => {
    connection.query(`UPDATE orders SET status='2' WHERE id = '${req.params.id}'`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" });
            message = `<html><head><style>
                        * {margin: 0;padding: 0;box-sizing: border-box;}
                        .contain {background-color: #f7f7f7;padding: 40px 20px;text-align: center;}
                        h1 {font-size: 40px;margin: 20px 0;}
                            .btn {
                                color: #fff;background: linear-gradient(45deg,#0053fe,#f100fe,#f100fe,#f100fe);border: none;border-radius: 5px;font-size: 18px;cursor: pointer;margin-top: 15px;margin-bottom: 15px;display: inline-block;font-weight: 600;outline: none;padding: 15px 25px;text-decoration: none;}
                        </style>
                        </head><body>
                        <div class="contain">
                            <p style="font-size:20px">Hi, your order has been cancelled. <b>If not you contact us as soon as possible.</b></p>
                            <a style="color:#fff;" class="btn" href="https://softingart.com/contact">Contact Us Today</a>
                            <p>Thankyou, Have a great day.</p>
                            </div></body></html>`;

            sendMail(`Order has been cancelled`, req.params.email, message);
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.put("/account/update", (req, resp) => {
    connection.query(`UPDATE user SET name='${req.body.name}' WHERE id = '${req.body.id}'`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" })
        } else {
            resp.send({ status: "failed" })
        }
    })
})

app.get("/check-cart/:id/:email", (req, resp) => {
    connection.query(`SELECT cart.number FROM cart INNER JOIN user ON cart.costumer_email = user.id WHERE user.email = '${req.params.email}' && cart.product_id = '${req.params.id}' ORDER BY number DESC;`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                resp.send({ status: true });
            } else {
                resp.send({ status: false });
            }
        } else {
            resp.send({ status: false });
        }
    });
})

app.post(`/add-to-cart`, (req, resp) => {
    connection.query(`SELECT id FROM user WHERE email = '${req.body.email}'`, (err, res) => {
        if (!err) {
            connection.query(`INSERT INTO cart(product_id, costumer_email, total) VALUES ('${req.body.id}','${res[0].id}','${req.body.count}')`, (error, data) => {
                if (!error) {
                    resp.send({ status: "success" });
                } else {
                    resp.send({ status: "failed" });
                }
            })
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/cart-products/:email", (req, resp) => {
    connection.query(`SELECT products.image, products.id, products.name, products.price, cart.number, cart.total FROM cart INNER JOIN products ON products.id = cart.product_id INNER JOIN user ON user.id = cart.costumer_email WHERE user.email = "${req.params.email}" ORDER BY cart.number DESC;`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/remove-from-cart/:id", (req, resp) => {
    connection.query(`DELETE FROM cart WHERE number = '${req.params.id}'`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.post("/checkout", (req, resp) => {
    connection.query(`INSERT INTO orders(email, product_id, total, status) VALUES ('${req.body.email}','${req.body.product_id}','${req.body.total}','0')`, (err, data) => {
        if (!err) {
            connection.query(`DELETE FROM cart WHERE number = '${req.body.number}'`, (error, data2) => {
                if (!error) {
                    resp.send({ status: "success" });
                    message = `<html><head><style>
                                * {margin: 0;padding: 0;box-sizing: border-box;}
                                .contain {background-color: #f7f7f7;padding: 40px 20px;text-align: center;}
                                h1 {font-size: 40px;margin: 20px 0;}
                                    .btn {
                                        color: #fff;background: linear-gradient(45deg,#0053fe,#f100fe,#f100fe,#f100fe);border: none;border-radius: 5px;font-size: 18px;cursor: pointer;margin-top: 15px;margin-bottom: 15px;display: inline-block;font-weight: 600;outline: none;padding: 15px 25px;text-decoration: none;}
                                </style>
                                </head><body>
                                <div class="contain">
                                    <p style="font-size:20px">Thankyou for shopping with us. Your Order has been placed. If you have some queries please contact us by the below button.</p>
                                    <a style="color:#fff;" class="btn" href="https://softingart.com/contact">Contact Us Today</a>
                                    <p>Thankyou, Have a great day.</p>
                                    </div></body></html>`;

                    sendMail(`Order has been placed`, req.body.mail, message);
                } else {
                    resp.send({ status: "failed" });
                }
            })
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/send-verify/:email", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.params.email}'`, (err, dara) => {
        if (!err && dara.length > 0) {
            var otp = Math.round(Math.random() * 100000);
            connection.query(`UPDATE user SET otp ='${otp}' WHERE email = '${req.params.email}'`, (error, data) => {
                if (!error) {
                    resp.send({ status: "success" });
                    message = `<html><head><style>
                        * {margin: 0;padding: 0;box-sizing: border-box;}
                        .contain {background-color: #f7f7f7;padding: 40px 20px;text-align: center;}
                        h1 {font-size: 40px;margin: 20px 0;}
                        .btn {
                            color: #fff;background: linear-gradient(45deg,#0053fe,#f100fe,#f100fe,#f100fe);border: none;border-radius: 5px;font-size: 18px;cursor: pointer;margin-top: 15px;margin-bottom: 15px;display: inline-block;font-weight: 600;outline: none;padding: 15px 25px;text-decoration: none;}
                    </style>
                    </head><body>
                    <div class="contain">
                        <p style="font-size:20px">
                            Hi, ${req.params.email} Thanks for be a member of SoftingArt.com. To verify your email click the link  given below and enter the code given below.
                        </p>
                        <h1>${otp}</h1>
                        <a style="color:#fff;" class="btn" href="https://softingart.com/verify/${req.params.email}">Verify Now</a>
                        <p>Thankyou, Have a great day.</p>
                    </div></body></html>`;

                    sendMail(`Verify Email For ${req.params.email}`, req.params.email, message);
                }
            })
        } else {
            resp.send({ status: "failed" });
        }
    })
})
app.post("/contact", (req, resp) => {
    connection.query(`INSERT INTO contact(name, email, phone, subject, message) VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.subject}','${req.body.message}')`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" });
            message = `<table>
                <tbody>
                    <tr>
                        <td><b>Name</b></td>
                        <td>${req.body.name}</td>
                    </tr>
                    <tr>
                        <td><b>Email</b></td>
                        <td>${req.body.email}</td>
                    </tr>
                    <tr>
                        <td><b>Phone</b></td>
                        <td>${req.body.phone}</td>
                    </tr>
                    <tr>
                        <td><b>Subject</b></td>
                        <td>${req.body.subject}</td>
                    </tr>
                    <tr>
                        <td><b>Message</b></td>
                        <td>${req.body.message}</td>
                    </tr>
                </tbody>
            </table>`;

            sendMail(`${req.body.subject}`, "sokalsanjay@gmail.com", message);
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/category/:name", (req, resp) => {
    connection.query(`SELECT products.name, products.id, products.price, products.image, products.catagory, catagories.catagory_name, products.del FROM catagories INNER JOIN products ON catagories.id = products.catagory WHERE catagories.link = '${req.params.name}' ORDER BY products.id DESC;`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/add-category/:name/:link", (req, resp) => {
    connection.query(`INSERT INTO catagories(catagory_name, link) VALUES ('${req.params.name}','${req.params.link}')`, (err, res) => {
        if (!err) {
            resp.send({ status: "success" });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

app.get("/all-category", (req, resp) => {
    connection.query(`SELECT * FROM catagories`, (err, res) => {
        resp.send(res);
    })
})

app.get("/all-category/:id", (req, resp) => {
    connection.query(`SELECT * FROM catagories WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send(res);
    })
})

app.get("/delete-category/:id", (req, resp) => {
    connection.query(`DELETE FROM catagories WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.get("/update-category/:id/:name/:link", (req, resp) => {
    connection.query(`UPDATE catagories SET catagory_name = '${req.params.name}', link = '${req.params.link}' WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.post("/add-product", (req, resp) => {
    console.log(req.files.image);
    console.log(uploadImage("products/" + req.body.ramdName, req.body.imgName, req.files.image));
    connection.query("INSERT INTO products (name, catagory, image, price, del, `desc`, small) VALUES" + `('${req.body.name}','${req.body.category}','${req.body.ramdName}','${req.body.price}','${req.body.del}','${req.body.desc}','${req.body.small}')`, (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err) }
    })
})

app.get("/delete-product/:id", (req, resp) => {
    connection.query(`DELETE FROM products WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.get("/update-product/name/:id/:name", (req, resp) => {
    connection.query("UPDATE products SET name = '" + req.params.name + "' WHERE id = '" + req.params.id + "'", (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.get("/update-product/price/:id/:price", (req, resp) => {
    connection.query(`UPDATE products SET price = '${req.params.price}' WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.get("/update-product/del/:id/:del", (req, resp) => {
    connection.query(`UPDATE products SET del = '${req.params.del}' WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.post("/update-product/desc/:id/", (req, resp) => {
    connection.query("UPDATE products SET `desc` = '" + req.body.desc + "' WHERE id = '" + req.params.id + "'", (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: err });
    })
})

app.post("/update-product/small/:id/", (req, resp) => {
    connection.query(`UPDATE products SET small = '${req.body.small}' WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.get("/update-product/catagory/:id/:catagory", (req, resp) => {
    connection.query(`UPDATE products SET catagory = '${req.params.catagory}' WHERE id = '${req.params.id}'`, (err, res) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    })
})

app.get("/all-orders/:search", (req, resp) => {
    connection.query(`SELECT orders.id as orderid, orders.date, orders.status, products.id as product_id, products.name as products_name, orders.total, products.price, user.email, user.name as u_name FROM orders INNER JOIN products ON orders.product_id = products.id INNER JOIN user ON user.id = orders.email WHERE user.email LIKE '%${req.params.search}%' OR products.name LIKE '%${req.params.search}%' OR user.name LIKE '%${req.params.search}%' OR user.id LIKE '%${req.params.search}%' OR products.id LIKE '%${req.params.search}%' OR user.phone LIKE '%${req.params.search}%' OR user.pincode LIKE '%${req.params.search}%' OR user.city LIKE '%${req.params.search}%' OR user.state LIKE '%${req.params.search}%' OR orders.id LIKE '%${req.params.search}%' ORDER BY orders.id DESC;`, (err, data) => resp.send(data));
})

app.get("/cancel-order/:id", (req, resp) => {
    connection.query(`UPDATE orders SET status = '2' WHERE id = '${req.params.id}'`, (err, data) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    });
})

app.get("/complete-order/:id", (req, resp) => {
    connection.query(`UPDATE orders SET status = '1' WHERE id = '${req.params.id}'`, (err, data) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    });
})

app.get("/all-users/:search", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE name LIKE '%${req.params.search}%' OR email LIKE '%${req.params.search}%'`, (err, data) => {
        if (!err) resp.send({ status: data }); else resp.send({ status: "failed" });
    });
})

app.get("/user/:id", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE id = '${req.params.id}'`, (err, data) => {
        if (!err) resp.send({ status: data }); else resp.send({ status: "failed" });
    });
})

app.post("/set-user/:id", (req, resp) => {
    connection.query(`UPDATE user SET name='${req.body.name}',phone='${req.body.phone}',address='${req.body.address}',pincode='${req.body.pincode}',city='${req.body.city}',state='${req.body.state}',type='${req.body.type}' WHERE id = '${req.params.id}'`, (err, data) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    });
})

app.get("/delete-users/:id", (req, resp) => {
    connection.query(`DELETE FROM user WHERE id = '${req.params.id}'`, (err, data) => {
        if (!err) resp.send({ status: "success" }); else resp.send({ status: "failed" });
    });
})
