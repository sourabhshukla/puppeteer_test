const AWS = require("aws-sdk");
const { execSync } = require("child_process");
const { Client } = require("ssh2");
const fs = require("fs");

AWS.config.update({
  //   region: "ap-south-1",
  //   accessKeyId: "AKIAXYKJUKMZMVZ7LQ5V",
  //   secretAccessKey: "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",
  region: "us-east-1",
  accessKeyId: "AKIAQIMXWD5CTDEQVLCH",
  secretAccessKey: "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",
});

const ec2 = new AWS.EC2();

const params = {
  //   ImageId: "ami-03f4878755434977f",
  ImageId: "ami-0c7217cdde317cfec",
  InstanceType: "t2.micro",
  //   KeyName: "kartikay",
  KeyName: "heelo",
  MinCount: 1,
  MaxCount: 1,
  SecurityGroupIds: ["sg-0ce18f16b4d848834"],
  //   SubnetId: "subnet-0943b55ea014dfbc5",
};

ec2.runInstances(params, function (err, data) {
  if (err) {
    console.error("Error creating EC2 instance:", err);
  } else {
    const instanceId = data.Instances[0].InstanceId;
    console.log(data.Instances[0]);
    console.log("EC2 instance created with ID:", instanceId);

    waitForInstanceRunning(instanceId);
  }
});

function waitForInstanceRunning(instanceId) {
  const params = {
    InstanceIds: [instanceId],
  };

  ec2.waitFor("instanceRunning", params, function (err, data) {
    if (err) {
      console.error("Error waiting for instance to be running:", err);
    } else {
      console.log("Instance is now running:", data.Reservations[0]);
      const PublicIpAddress = data.Reservations[0].Instances[0].PublicIpAddress;

      installNodeJs(PublicIpAddress);
    }
  });
}

function installNodeJs(publicIpAddress) {
  const commands = ["sudo apt update", "sudo apt install -y nodejs"];
  const privateKeyPath = "heelo.pem";
  const key = fs.readFileSync(privateKeyPath);
  console.log("IP=", publicIpAddress);

  // Specify the SSH client configuration
  const sshConfig = {
    host: publicIpAddress.trim(),
    username: "ubuntu", // or the appropriate username for your instance
    privateKey: key,
  };
  //  const installNodeCommand = `ssh -tt -o StrictHostKeyChecking=no -i "heelo.pem" ubuntu@${PublicDnsName} '${commands}'`;

  const sshClient = new Client();
  sshClient.connect(sshConfig);

  sshClient.on("ready", function () {
    console.log("SSH connection established.");

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

  // Handle SSH connection errors
  sshClient.on("error", function (err) {
    console.error("SSH connection error:", err);
  });
}
