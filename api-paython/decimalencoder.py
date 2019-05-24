import decimal
import json


class DecimalEncode(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return int(o)
        return super(DecimalEncoder, self).default(o)