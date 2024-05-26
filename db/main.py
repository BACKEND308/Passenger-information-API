import os
from connect import connectDB,connect_mysql, fetch_data_from_mongodb, create_table_and_insert_data
from enum import Enum
import random
import string 


class SeatType(Enum):
    BUSINESS = 'business'
    ECONOMY = 'economy'




def insert_passengers(db, passengers):
    try:
        passenger_info_collection = db.passenger_info
        result = passenger_info_collection.insert_many(passengers)
        print(f"Inserted passenger IDs: {result.inserted_ids}")
    except Exception as e:
        print(f"Failed to insert passengers: {e}")
def generate_flight_id():
    letters = "FL"  # Using 'FL' as the company's prefix
    numbers = ''.join(random.choice(string.digits) for _ in range(4))
    return f"{letters}{numbers}"

def generate_passenger_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))


def main():
    db = connectDB()
   
    passengers = []
    for i in range(1):
        age = random.randint(0, 2)
        passenger_id = generate_passenger_id()
        seat_assigned = None if age <= 2 else random.choice([None, f"{random.choice(['12A', '12B', '12C'])}"])
        passenger_info = {
            'passenger_id': passenger_id,
            'Flight_ID': generate_flight_id(),
            'Name': f"Passenger{i + 1}",
            'Age': age,
            'Gender': random.choice(['Male', 'Female', 'None']),
            'Nationality': random.choice(['Canadian', 'American', 'British', 'Z', 'Swedish', 'French', 'Russian', 'Indian'])
        }
        
        if age <= 2:
            # Add only parent info for infants
            passenger_info.update({
                'Parent_info': {'Parent_ID': generate_passenger_id(), 'Parent_Seat': random.choice(['12A', '12B', '12C'])}
            })
        else:
            passenger_info.update({
                'Seat_type': random.choice([e.value for e in SeatType]),
                'Seat_assigned': seat_assigned
            })
            if not seat_assigned:
                # Assign affiliated passenger IDs if no seat is assigned
                affiliated_ids = [generate_passenger_id() for _ in range(random.choice([1, 2]))]
                passenger_info['AffiliatedPassengerIDs'] = affiliated_ids

        passengers.append(passenger_info)

    # try:
    #     passenger_info_collection = db.passenger_info
    #     result = passenger_info_collection.insert_many(passengers)
    #     print(f"Inserted passenger IDs: {result.inserted_ids}")
    # except Exception as e:
    #     print(f"Failed to insert passengers: {e}")


    # # Example: Transfer 'passenger_info' from MongoDB to a new MySQL table 'passenger_sql'
    # collection_name = 'passenger_info'  # Adjust the collection name as needed
    # data = fetch_data_from_mongodb(db, collection_name)  
    # if data:
    #     print(f"Fetched {len(data)} documents from MongoDB collection '{collection_name}'")
    #     create_table_and_insert_data(engine, data, 'passenger_sql')  # Adjust the SQL table name as needed
    # else:
    #     print(f"No data found in MongoDB collection '{collection_name}'")
if __name__ == '__main__':
    main()