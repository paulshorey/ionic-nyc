iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3080
cd /www/ionic-nyc
i=0;
while true; do
	i=$[$i+1]
	node app.js
	sleep 6
done