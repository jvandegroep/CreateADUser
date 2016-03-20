# CreateADUser
A local TestLab HTML web page with JS for creating Active Directory users.

# Internal workings
This website runs with Express.js on node:argon within Docker. Other components are:
- Bootstrap
- JQuery
- CSS

Please note that the site makes use of a NodeJS backend web server running on Windows exposing the necessary API's to Active Directory.  Node.edge is installed to make use PowerShell scripts and modules in order to connect AD.

# Limitations
- No SSL/TLS security
- Client, no server side name transformation
- Limited input checking
- This code is only the front, not the API back end.

# HOW TO Create and Run the docker locally
- To create the docker image type: "docker build -t [username]/dockercreateaduser"
- To run the docker type: "docker run -p 8080:8080 -d [username]/dockercreateaduser"
- Login to docker type: "docker exec -it [id] /bin/bash"
