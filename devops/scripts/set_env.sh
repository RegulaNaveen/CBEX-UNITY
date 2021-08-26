#!/bin/bash
if [ $CI_COMMIT_REF_NAME == "master" ]
then
   echo "Environment=prod" > build.env
elif [ $CI_COMMIT_REF_NAME == "uat" ]
then
   echo "Environment=uat" > build.env
elif [ $CI_COMMIT_REF_NAME == "qa" ]
then
   echo "Environment=qa" > build.env
elif [ $CI_COMMIT_REF_NAME == "sprintdev" ]
then
   echo "Environment=sdev" > build.env
elif [ $CI_COMMIT_REF_NAME == "dev" ]
then
   echo "Environment=dev" > build.env
elif [[ $CI_COMMIT_REF_NAME == "feature/"* ]]
then
   echo "Environment=dev" > build.env  
else
   exit
fi
