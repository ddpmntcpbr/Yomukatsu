FROM ruby:2.5

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y --no-install-recommends build-essential nodejs curl git mariadb-client yarn sudo vim

# # AWS System Manager セッションマネージャ用のエージェントをインストール
# RUN curl https://s3.ap-northeast-1.amazonaws.com/amazon-ssm-ap-northeast-1/latest/debian_amd64/amazon-ssm-agent.deb -o /tmp/amazon-ssm-agent.deb \
#     && dpkg -i /tmp/amazon-ssm-agent.deb \
#     && cp /etc/amazon/ssm/seelog.xml.template /etc/amazon/ssm/seelog.xml

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# RUN apt-get update -qq && \
#   apt-get install -y build-essential \
#   libpq-dev \
#   sudo \
#   nginx && \
#   gem install bundler:2.0.1

RUN bundle install

COPY . /myapp
RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

# RUN groupadd nginx
# RUN useradd -g nginx nginx
# ADD nginx/nginx.conf /etc/nginx/nginx.conf

# Add a script to be executed every time the container starts.
VOLUME /myapp/tmp
COPY entrypoint.staging.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.staging.sh
ENTRYPOINT ["entrypoint.staging.sh"]
EXPOSE 3000

# puma.sockを配置するディレクトリを作成
# RUN mkdir -p tmp/sockets