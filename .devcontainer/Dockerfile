FROM node:18.12

ARG USER_NAME=user
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG GITHUB_TOKEN

# Install necessary apps
RUN apt-get update \
    && apt-get install -y git fish sudo \
    && npm install -g @ionic/cli

# Create the user
RUN groupadd --gid ${USER_GID} ${USER_NAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USER_NAME} \
    && echo $USER_NAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USER_NAME} \
    && chmod 0440 /etc/sudoers.d/${USER_NAME}
USER ${USER_NAME}

# Copy files
WORKDIR /workspaces
COPY --chown=${USER_UID}:${USER_GID} . .
RUN npm install

# Infinite development loop
CMD ["/bin/bash", "-c", "while true; do sleep 1000; done"]
