FROM centos:8
RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

RUN yum -y update && \
    yum -y install epel-release && \
    yum -y install curl && \
    curl -fsSL https://rpm.nodesource.com/setup_14.x | bash - && \
    yum -y install nodejs java-11-openjdk-headless && \
    yum clean all

RUN npm install -g yarn

ENV JAVA_HOME=/usr/lib/jvm/jre-11
ENV PATH=$PATH:$JAVA_HOME/bin
WORKDIR srv/booking_api
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 8800
ENV MONGO=${MONGO}
CMD ["yarn", "run", "start"]