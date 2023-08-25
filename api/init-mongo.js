mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    db.createUser(
        {
            user: "$MONGO_USERNAME",
            pwd: "$MONGO_PASSWORD",
            roles: [
                {
                    role: "readWrite",
                    db: "$MONGODB_INITDB_DATABASE"
                }
            ]
        }
    );
EOF

