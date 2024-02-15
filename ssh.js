const { Client } = require("ssh2");

// Create a new SSH client instance
const sshClient = new Client();

// Configure the connection parameters
const connectionParams = {
  host: "184.72.215.31",
  username: "ubuntu",
  privateKey: require("fs").readFileSync("heelo.pem"),
};

// Connect to the SSH server
sshClient.connect(connectionParams);

sshClient.on("ready", () => {
  console.log("Connected via SSH!");
  console.log("SSH connection established.");
  const commands = ["sudo apt update", "sudo apt install -y nodejs"];

  // Execute commands
  sshClient.exec(commands.join(" && "), function (err, stream) {
    if (err) {
      console.error("Error executing commands:", err);
      sshClient.end();
      return;
    }

    // Handle command output
    stream.on("data", function (data) {
      console.log("Output:", data.toString());
    });

    // Handle command completion
    stream.on("close", function () {
      console.log("SSH connection closed.");
      sshClient.end();
    });
  });
});

sshClient.on("error", (err) => {
  console.error("Error connecting via SSH:", err);
});
