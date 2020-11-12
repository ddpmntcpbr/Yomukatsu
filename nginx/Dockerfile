FROM nginx:1.15.8

# ヘルスチェック用
RUN apt-get update && apt-get install -y curl vim sudo
# インクルード用のディレクトリ内を削除
RUN rm -f /etc/nginx/conf.d/*

# Nginxの設定ファイルをコンテナにコピー
ADD nginx.conf /etc/nginx/myapp.conf

# ビルド完了後にNginxを起動
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/myapp.conf

EXPOSE 80