import re
import json

def process_json(file_path):
    with open(file_path, "r") as g:
        output_vouchers = json.load(g)

    output_string = str(output_vouchers)
    json_data = re.sub(r'^\[|\]$', '', output_string)
    final_output = json_data.replace('}, {', '}{')
    new_string = final_output.replace("'", "\"")
    modified_string = new_string.replace('("', "('")
    modified_string_output = modified_string.replace('")', "')")
    false_word= modified_string_output.replace("False", "false")
    true_word= false_word.replace("True", "true")
    null_word= true_word.replace("None", "null")

    with open(file_path, 'w') as h:
        h.write(null_word)