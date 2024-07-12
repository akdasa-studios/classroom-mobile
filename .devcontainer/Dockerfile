FROM node:18.12

ARG USER_ID=1000
ARG USER_NAME=dev
ARG GROUP_ID=$USER_UID
ARG GROUP_NAME=dev

# Install necessary apps
RUN apt-get update \
    && apt-get install -y git fish sudo \
    && npm install -g @ionic/cli

# Create the user
RUN    getent group ${GROUP_ID} || groupadd --gid ${GROUP_ID} ${GROUP_NAME} \
    && getent passwd ${USER_ID} || useradd --uid ${USER_ID} --gid ${GROUP_ID} -m ${USER_NAME} \
    && echo $USER_NAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USER_NAME} \
    && chmod 0440 /etc/sudoers.d/${USER_NAME}
USER ${USER_ID}:${GROUP_ID}

# Copy files
WORKDIR /akd-studios/classroom/classroom-mobile
COPY --chown=${USER_ID}:${GROUP_ID} . .
RUN npm i

# Infinite development loop
CMD ["/bin/bash", "-c", "while true; do sleep 1000; done"]
