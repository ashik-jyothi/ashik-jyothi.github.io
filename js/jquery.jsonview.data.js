var json = {
            "tid": 2,
            "workflow_log_id": 1024,
            "workflow_id": "5aa27311e948d98c388b4567",
            "workflow_name": "ChartInChatBoat",
            "executed_from": {
            "mode": "spreadsheet_col_change",
            "file": "2-30-1570# tid-lid-fid"
            },
            "executedby": 12,
            "status": "success",
            "startTime": "2018 - 03 - 22 11: 42: 14",
            "endTime": "2018 - 03 - 22 06: 12: 14",
            "blockExecutedTime": [
            {
                "block_name": "Post Block",
                "block_label": "Entry",
                "time": 1
            },
            {
                "block_name": "Condition Block",
                "block_label": "Condition",
                "time": 1
            },
            {
                "block_name": "Spreadsheet Data Filter",
                "block_label": "Filter",
                "time": 1
            }
            ],
            "blockDetails": {
            "4202_2": {
                "block_type": "genericpost",
                "block_label": "Entry",
                "block_name": "Post Block",
                "started-at": "2018-03-22 06:12:14.00",
                "completed-at": "2018-03-22 06:12:14.00",
                "execution_time": 0.0007810592651367188,
                "completed": "Yes",
                "data": {
                "input": {
                    
                },
                "output": {
                    "id": 1,
                    "name": "pratheesh",
                    "age": 25
                }
                
                }
            },
            "5001_4": {
                "block_type": "condition",
                "block_label": "Condition",
                "block_name": "Conditional Block",
                "started-at": "2018-03-22 06:12:14.00",
                "completed-at": "2018-03-22 06:12:14.00",
                "execution_time": 0.0007810592651367188,
                "completed": "Yes",
                "data": {
                "condition": "Entry.Body<10",
                "input": {
                    "Entry.id": 1,
                    "Entry.name": "pratheesh",
                    "Entry.age": 25
                },
                "output": {
                    "result": "true"
                }
                
                }
            },
            "4101_3": {
                "block_type": "ssdatafilter",
                "block_label": "Filter",
                "block_name": "Spreadsheet Data Filter",
                "started-at": "2018-03-22 06:12:14.00",
                "completed-at": "2018-03-22 06:12:14.00",
                "execution_time": 0.01811504364013672,
                "completed": "Yes",
                "data": {
                "filterSS": "5a72a768e948d9a3058b456a",
                "filterCondition": {
                    "Input": "Entry.Body"
                },
                "input": {
                    "Entry.id": 1,
                    "Entry.name": "pratheesh",
                    "Entry.age": 25
                },
                "output": {
                    "result": "true",
                    "data": {
                    "Input": "1",
                    "Config": "bla bla",
                    "status": "pending"
                    }
                }
                
                }
            },
            "1700_5": {
                "block_type": "setvariable",
                "block_label": "Result",
                "block_name": "Set Variable",
                "started-at": "2018-03-22 06:12:14.00",
                "completed-at": "2018-03-22 06:12:14.00",
                "execution_time": 0.0005741119384765625,
                "completed": "Yes",
                "data": {
                "setVaribale": "Body=Filter.Config",
                "input": {
                    "Entry": {
                    "id": 1,
                    "name": "pratheesh",
                    "age": 25
                    },
                    "Filter": {
                    "Input": "1",
                    "Config": "bla bla",
                    "status": "pending"
                    }
                },
                "output": {
                    "result": "true",
                    "data": "bla bla"
                }
                
                }
            }
            }
        };
        
