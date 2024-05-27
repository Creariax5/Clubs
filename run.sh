#!/bin/bash 


echo "building!"
export ANDROID_HOME=/home/florian/Android/Sdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
eas build -p android --profile development --local
